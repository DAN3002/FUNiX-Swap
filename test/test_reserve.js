const Reserve = artifacts.require("./Reserve.sol");
const Token = artifacts.require("./Token.sol");

contract("Reserve contract", (accounts) => {
	let tokenA, reserveA;
	before(async () => {
		tokenA = await Token.new("TokenA", "TKA", 18);
		reserveA = await Reserve.new(tokenA.address, 100, 100)

		// Transfer init token to reserve
		let initialTokenAmount = web3.utils.toWei("100", "ether");
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
			// null
			assert.notEqual(tokenA.address, 0x0);
			assert.notEqual(tokenA.address, "");
			assert.notEqual(tokenA.address, null);
			assert.notEqual(tokenA.address, undefined);

			// attributes
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
});
