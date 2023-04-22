const Reserve = artifacts.require("Reserve");
const Token = artifacts.require("Token");
const Exchange = artifacts.require("Exchange");

const gasLimit = 2206142;
const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

module.exports = async function (deployer, network, accounts) {
	// Use deployer to state migration tasks.
	const tokenA = await Token.new("TokenA", "TKA", 18);
	const tokenB = await Token.new("TokenB", "TKB", 18);
	const reserveA = await Reserve.new(tokenA.address, 100, 100, {
		gas: gasLimit
	})
	const reserveB = await Reserve.new(tokenB.address, 100, 100, {
		gas: gasLimit
	})

	// Transfer init token to reserve
	let initialTokenAmount = web3.utils.toWei("100000", "ether");
	await tokenA.transfer(reserveA.address, initialTokenAmount, {
		from: accounts[0]
	});
	await tokenB.transfer(reserveB.address, initialTokenAmount, {
		from: accounts[0]
	});

	const exchangeContract = await Exchange.new({
		gas: gasLimit
	});

	// Add Reserve to Exchange
	await exchangeContract.addReserve(reserveA.address, tokenA.address);
	await exchangeContract.addReserve(reserveB.address, tokenB.address);

	// Test getReserve
	// console.log(await exchangeContract.getReserve(tokenA.address));
	
	const printAccountInfo = async () => {
		console.log("Balance of account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");
		console.log("Balance of account 1: ", web3.utils.fromWei(await tokenB.balanceOf(accounts[1]), 'ether') + " TKB");
		console.log("Balance of account 1: ", web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), 'ether') + " ETH");
	}
	
	console.log("===== Exchange =====");
	await printAccountInfo();

	console.log("===== ETH to TKA =====");
	let amount = web3.utils.toWei("1", "ether");
	await exchangeContract.exchange(ETH_ADDRESS, tokenA.address, amount, {
		from: accounts[1],
		value: amount
	});
	await printAccountInfo();

	// console.log("===== TKA to ETH =====");
	// amount = web3.utils.toWei("100", "ether");
	// await tokenA.approve(exchangeContract.address, amount, {
	// 	from: accounts[1]
	// });
	// await exchangeContract.exchange(tokenA.address, ETH_ADDRESS, amount, {
	// 	from: accounts[1],
	// 	gasLimit: 2206142
	// });

	console.log("===== TKA to TKB =====");
	amount = web3.utils.toWei("50", "ether");
	await tokenA.approve(exchangeContract.address, amount, {
		from: accounts[1]
	});
	await exchangeContract.exchange(tokenA.address, tokenB.address, amount, {
		from: accounts[1],
	});


	await printAccountInfo();
};
