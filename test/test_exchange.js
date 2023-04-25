const Exchange = artifacts.require("./Exchange.sol");
const Reserve = artifacts.require("./Reserve.sol");
const Token = artifacts.require("./Token.sol");

contract("Exchange contract", function (accounts) {
	let tokenA, tokenB, reserveA, reserveB, exchange;

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
});
