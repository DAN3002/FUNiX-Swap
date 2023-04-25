const Exchange = artifacts.require("./Exchange.sol");
const Reserve = artifacts.require("./Reserve.sol");
const Token = artifacts.require("./Token.sol");

contract("Exchange contract", function (accounts) {
	let tokenA, tokenB, reserveA, reserveB, exchange;
	const NULL_ADDRESS = "0x0000000000000000000000000000000000000000"
	const NATIVE_TOKEN = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

	before(async () => {
		tokenA = await Token.new("TokenA", "TKA", 18);
		tokenB = await Token.new("TokenB", "TKB", 18);
		reserveA = await Reserve.new(tokenA.address, 100, 100);
		reserveB = await Reserve.new(tokenB.address, 100, 100);


		// Transfer init token to reserve
		let initialTokenAmount = web3.utils.toWei("1000", "ether");
		await tokenA.transfer(reserveA.address, initialTokenAmount);
		await tokenB.transfer(reserveB.address, initialTokenAmount);
		assert.equal((await tokenA.balanceOf(reserveA.address)).toString(), initialTokenAmount);
		assert.equal((await tokenB.balanceOf(reserveB.address)).toString(), initialTokenAmount);

		await web3.eth.sendTransaction({
			from: accounts[0],
			to: reserveA.address,
			value: initialTokenAmount
		});
		await web3.eth.sendTransaction({
			from: accounts[0],
			to: reserveB.address,
			value: initialTokenAmount
		});

		assert.equal((await web3.eth.getBalance(reserveA.address)).toString(), initialTokenAmount);
		assert.equal((await web3.eth.getBalance(reserveB.address)).toString(), initialTokenAmount);

		exchange = await Exchange.new();
	});

	beforeEach(async () => {});

	describe("Contract deployment", () => {
		it("Exchange contract deployment", async () => {
			assert.notEqual(exchange.address, 0x0);
			assert.notEqual(exchange.address, "");
			assert.notEqual(exchange.address, null);
			assert.notEqual(exchange.address, undefined);
		});
	});

	describe("Reserve management", () => {
		it("Only owner can add/remove reserve", async () => {
			try {
				await exchange.addReserve(reserveA.address, tokenA.address, {
					from: accounts[1]
				});
				assert.fail("Only owner can call this function");
			} catch (error) {
				assert.ok(/revert/i.test(error.message));
			}
			try {
				await exchange.addReserve(reserveA.address, tokenA.address, {
					from: accounts[1]
				});
				assert.fail("Only owner can call this function");
			} catch (error) {
				assert.ok(/revert/i.test(error.message));
			}

		});

		it("Add reserve", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);
			await exchange.addReserve(reserveB.address, tokenB.address);

			assert.equal((await exchange.reserves(tokenA.address)).toString(), reserveA.address);
			assert.equal((await exchange.reserves(tokenB.address)).toString(), reserveB.address);
		});

		it("Remove reserve", async () => {
			await exchange.deleteReserve(tokenA.address);
			await exchange.deleteReserve(tokenB.address);

			assert.equal((await exchange.reserves(tokenA.address)).toString(), NULL_ADDRESS);
			assert.equal((await exchange.reserves(tokenB.address)).toString(), NULL_ADDRESS);
		});
	});

	describe("Exchange rates between 2 tokens", () => {
		it("Get exchange rate for swap ETH to Token", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);

			const buyRate = 150;
			await reserveA.setBuyRate(buyRate);

			const rate = await exchange.getExchangeRate(NATIVE_TOKEN, tokenA.address);
			// convert rate to either
			const rateInEther = web3.utils.fromWei(rate.toString(), "ether");

			assert.equal(rateInEther, buyRate);
		});

		it("Get exchange rate for swap Token to ETH", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);

			const sellRate = 100;
			await reserveA.setSellRate(sellRate);

			const rate = await exchange.getExchangeRate(tokenA.address, NATIVE_TOKEN);
			assert.equal(rate, 1e18 / sellRate);
		});
		it("Get exchange rate for swap Token to Token", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);
			await exchange.addReserve(reserveB.address, tokenB.address);

			const buyRate = 150;
			const sellRate = 100;
			await reserveA.setSellRate(sellRate);
			await reserveB.setBuyRate(buyRate);

			const rate = await exchange.getExchangeRate(tokenA.address, tokenB.address);
			// convert rate to either
			const rateInEther = web3.utils.fromWei(rate.toString(), "ether");
			assert.equal(rateInEther, sellRate / buyRate);
		});

		it("Get exchange rate for swap Token to itself", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);

			const rate = await exchange.getExchangeRate(tokenA.address, tokenA.address);
			assert.equal(rate, 1e18);
		});
	});

	describe("Exchange Token with User", () => {
		it("Swap ETH to Token", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);

			const oldBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			const oldBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");

			const srcAmount = 1;
			const buyRate = 150;
			await reserveA.setBuyRate(buyRate);

			const sourceAmountInWei = web3.utils.toWei(srcAmount.toString(), "ether");

			await exchange.exchange(NATIVE_TOKEN, tokenA.address, sourceAmountInWei, {
				from: accounts[1],
				value: sourceAmountInWei
			});

			const newBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			const newBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");

			assert(oldBalanceETH - newBalanceETH >= srcAmount);
			assert(newBalanceTokenA - oldBalanceTokenA == srcAmount * buyRate);
		});

		it("Swap Token to ETH", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);

			const srcAmount = 100;
			const sellRate = 150;
			await reserveA.setSellRate(sellRate);

			const sourceAmountInWei = web3.utils.toWei(srcAmount.toString(), "ether");

			await tokenA.transfer(accounts[1], sourceAmountInWei);
			await tokenA.approve(exchange.address, sourceAmountInWei, {
				from: accounts[1]
			});

			const oldBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			const oldBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");

			await exchange.exchange(tokenA.address, NATIVE_TOKEN, sourceAmountInWei, {
				from: accounts[1]
			});

			const newBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			const newBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");

			assert(newBalanceETH - oldBalanceETH <= srcAmount / sellRate);
			assert(oldBalanceTokenA - newBalanceTokenA == srcAmount);
		});

		it("Swap Token to Token", async () => {
			await exchange.addReserve(reserveA.address, tokenA.address);
			await exchange.addReserve(reserveB.address, tokenB.address);

			const srcAmount = 100;
			const sellRate = 150;
			const buyRate = 200;
			await reserveA.setSellRate(sellRate);
			await reserveB.setBuyRate(buyRate);

			const sourceAmountInWei = web3.utils.toWei(srcAmount.toString(), "ether");

			await tokenA.transfer(accounts[1], sourceAmountInWei);
			await tokenA.approve(exchange.address, sourceAmountInWei, {
				from: accounts[1]
			});

			const oldBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");
			const oldBalanceTokenB = web3.utils.fromWei(await tokenB.balanceOf(accounts[1]), "ether");

			await exchange.exchange(tokenA.address, tokenB.address, sourceAmountInWei, {
				from: accounts[1]
			});

			const newBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");
			const newBalanceTokenB = web3.utils.fromWei(await tokenB.balanceOf(accounts[1]), "ether");

			assert(oldBalanceTokenA - newBalanceTokenA == srcAmount);
			assert(newBalanceTokenB - oldBalanceTokenB == srcAmount * sellRate / buyRate);
		});
	});
});
