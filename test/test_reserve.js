const Reserve = artifacts.require("./Reserve.sol");
const Token = artifacts.require("./Token.sol");

contract("Reserve contract", (accounts) => {
	before(async () => {
		const tokenA = await Token.new("TokenA", "TKA", 18);
		const reserveA = await Reserve.new(tokenA.address, 100, 100)

		// Transfer init token to reserve
		let initialTokenAmount = web3.utils.toWei("100000", "ether");
		await tokenA.transfer(reserveA.address, initialTokenAmount);
		assert.equal((await tokenA.balanceOf(reserveA.address)).toString(), initialTokenAmount);

		await web3.eth.sendTransaction({from: accounts[0], to: reserveA.address, value: initialTokenAmount});
		assert.equal((await web3.eth.getBalance(reserveA.address)).toString(), initialTokenAmount);
	});
});
