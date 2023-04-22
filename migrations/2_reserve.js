const Reserve = artifacts.require("Reserve");
const Token = artifacts.require("Token");

const gasLimit = 2206142;

module.exports = async function (deployer, network, accounts) {
	// Use deployer to state migration tasks.
	const tokenA = await Token.new("TokenA", "TKA", 18);
	const reserveA = await Reserve.new(tokenA.address, 100, 100, {
		gas: gasLimit
	})

	// Transfer init token to reserve
	let initialTokenAmount = web3.utils.toWei("100000", "ether");
	await tokenA.transfer(reserveA.address, initialTokenAmount, {
		from: accounts[0]
	});

	console.log("===== Init =====");
	console.log("Balance of account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");
	console.log("Balance of account 1: ", web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether') + " ETH");

	console.log("===== Buy =====");
	const buyAmount = web3.utils.toWei("1", "ether");
	await reserveA.buyToken({
		from: accounts[1],
		value: buyAmount
	});

	console.log("Balance of account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");
	console.log("Balance of account 1: ", web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether') + " ETH");

	console.log("===== Sell =====");
	const sellAmount = web3.utils.toWei("100", "ether");
	await tokenA.approve(reserveA.address, sellAmount, {
		from: accounts[1]
	});
	await reserveA.sellToken(sellAmount, {
		from: accounts[1]
	});
	console.log("Balance of account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");
	console.log("Balance of account 1: ", web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether') + " ETH");
};
