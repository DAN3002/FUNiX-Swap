const Reserve = artifacts.require("./Reserve.sol");
const Token = artifacts.require("./Token.sol");

contract("Reserve contract", (accounts) => {
	let tokenA, reserveA;
	before(async () => {
		tokenA = await Token.new("TokenA", "TKA", 18);
		reserveA = await Reserve.new(tokenA.address, 100, 100)

		// Transfer init token to reserve
		let initialTokenAmount = web3.utils.toWei("1000", "ether");
		await tokenA.transfer(reserveA.address, initialTokenAmount);
		assert.equal((await tokenA.balanceOf(reserveA.address)).toString(), initialTokenAmount);

		await web3.eth.sendTransaction({
			from: accounts[0],
			to: reserveA.address,
			value: initialTokenAmount
		});
		assert.equal((await web3.eth.getBalance(reserveA.address)).toString(), initialTokenAmount);
	});

	beforeEach(async () => {});

	describe("Contract deployment", () => {
		it("Token contract deployment", async () => {
			assert.notEqual(tokenA.address, 0x0);
			assert.notEqual(tokenA.address, "");
			assert.notEqual(tokenA.address, null);
			assert.notEqual(tokenA.address, undefined);

			assert.equal(await tokenA.name(), "TokenA");
			assert.equal(await tokenA.symbol(), "TKA");
			assert.equal(await tokenA.decimals(), 18);
		});

		it("Reserve contract deployment", async () => {
			assert.notEqual(reserveA.address, 0x0);
			assert.notEqual(reserveA.address, "");
			assert.notEqual(reserveA.address, null);
			assert.notEqual(reserveA.address, undefined);
		});
	});

	describe("Reserve contract infomation", () => {
		it("Owner should be set correctly", async () => {
			assert.equal(await reserveA.owner(), accounts[0]);
		});
		it("SupportedToken address should be set correctly", async () => {
			assert.equal((await reserveA.supportedToken()), tokenA.address);
		});
	});

	describe("Set Buy / Sell Rate", () => {
		it("Only owner can set buy rate", async () => {
			try {
				await reserveA.setBuyRate(200, {
					from: accounts[1]
				});
				assert.fail("Only owner can call this function");
			} catch (error) {
				assert.ok(/revert/i.test(error.message));
			}
		});

		it("Buy rate are set correctly", async () => {
			await reserveA.setBuyRate(200);
			assert.equal((await reserveA.getBuyRate()), 200);
		});

		it("Only owner can set sell rate", async () => {
			try {
				await reserveA.setSellRate(200, {
					from: accounts[1]
				});
				assert.fail("Only owner can call this function");
			} catch (error) {
				assert.ok(/revert/i.test(error.message));
			}
		});

		it("Sell rate are set correctly", async () => {
			await reserveA.setSellRate(200);
			assert.equal((await reserveA.getSellRate()), 200);
		});
	});

	describe("Exchange Token (Buy or Sell)", () => {
		it("Buy tokenA with ETH", async () => {
			const oldBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			const oldBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");

			const srcAmount = 1;
			const buyRate = 150;
			await reserveA.setBuyRate(buyRate);

			// buy tokenA with srcAmount Ether
			await reserveA.buyToken({
				from: accounts[1],
				value: web3.utils.toWei(srcAmount + "", "ether")
			});

			// check tokenA balance of accounts[1] in either way
			const newBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");
			assert.equal(newBalanceTokenA - oldBalanceTokenA, srcAmount * buyRate);


			// check ETH balance of accounts[1]
			const newBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			assert(oldBalanceETH - newBalanceETH >= srcAmount, "ETH balance is not correct");
		});

		it("Sell tokenA for ETH", async () => {
			const srcAmount = 100;
			const sellRate = 150;
			await reserveA.setSellRate(sellRate);

			// buy tokenA with srcAmount Ether
			await tokenA.transfer(accounts[1], web3.utils.toWei(srcAmount + "", "ether"), {
				from: accounts[0]
			});
			await tokenA.approve(reserveA.address, web3.utils.toWei(srcAmount + "", "ether"), {
				from: accounts[1]
			});

			const oldBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			const oldBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");

			await reserveA.sellToken(web3.utils.toWei(srcAmount + "", "ether"), {
				from: accounts[1]
			});

			// check tokenA balance of accounts[1] in either way
			const newBalanceTokenA = web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), "ether");
			assert.equal(oldBalanceTokenA - newBalanceTokenA, srcAmount);

			// check ETH balance of accounts[1]
			const newBalanceETH = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
			assert(newBalanceETH - oldBalanceETH <= srcAmount / sellRate, "ETH balance is not correct");
		});
	});
});
