const Reserve = artifacts.require("Reserve");
const Token = artifacts.require("Token");

const gasLimit = 2206142;

module.exports = async function (deployer, network, accounts) {
	// Use deployer to state migration tasks.
	const tokenA = await Token.new("TokenA", "TKA", 18);
	const tokenB = await Token.new("TokenB", "TKB", 18);

	const reserveA = await Reserve.new(tokenA.address, 100, 100, {
		gas: gasLimit
	})

	let initialTokenAmount = web3.utils.toWei("10000000000", "ether");
	await tokenA.transfer(reserveA.address, initialTokenAmount, {
		from: accounts[0]
	});

	console.log("Balance of reserveA: ", web3.utils.fromWei(await tokenA.balanceOf(reserveA.address), 'ether') + " TKA");

	console.log("============ Checking reserveA buy ============");
	console.log("Before Balance of Account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");

	const srcAmount = web3.utils.toWei("1", "ether");
	await reserveA.exchange(true, srcAmount, {
		from: accounts[1],
		value: srcAmount
	})

	console.log("After Balance of Account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");

	console.log("============ Checking reserveA sell ============");
	console.log("Before Balance of Account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");
	// check eth balance of reserveA
	console.log("Balance of reserveA: ", web3.utils.fromWei(await web3.eth.getBalance(reserveA.address), 'ether') + " ETH");

	const srcAmount2 = web3.utils.toWei("3", "ether");

	// Check allowance of reserveA

	// Approve to transfer 3 TKA from account 1 to reserveA
	await tokenA.approve(reserveA.address, srcAmount2, {
		from: accounts[1]
	});

	// sell token
	await reserveA.exchange(false, srcAmount2, {
		from: accounts[1]
	})

	console.log("After Balance of Account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");

	// Check eth balance of reserveA
	console.log("Balance of reserveA: ", web3.utils.fromWei(await web3.eth.getBalance(reserveA.address), 'ether') + " ETH");

	// Check eth balance of account 1
	console.log("Balance of Account 1: ", web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether') + " ETH");
};
