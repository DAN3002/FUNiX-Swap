const TokenA = artifacts.require("Token");
const TokenB = artifacts.require("Token");
const ReserveA = artifacts.require("Reserve");
const ReserveB = artifacts.require("Reserve");
const Exchange = artifacts.require("Exchange");

const gasLimit = 2206142;

module.exports = async function (deployer, network, accounts) {
	console.log("Start deploy contract");
	console.log("Deploying on network: " + network);
    console.log("Deployer account: " + accounts[0]);

	console.log("======= Deploy Token =======");
	await deployer.deploy(TokenA, "TokenA", "TKA", 18);
	const tokenA = await TokenA.deployed();

	await deployer.deploy(TokenB, "TokenB", "TKB", 18);
	const tokenB = await TokenB.deployed();

	console.log("Token A: ", tokenA.address);
	console.log("Token B: ", tokenB.address);

	console.log("======= Deploy Reserve =======");
	await deployer.deploy(ReserveA, tokenA.address, 100, 100, {
		gas: gasLimit
	});
	const reserveA = await ReserveA.deployed();

	await deployer.deploy(ReserveB, tokenB.address, 100, 100, {
		gas: gasLimit
	});
	const reserveB = await ReserveB.deployed();

	console.log("Reserve A: ", reserveA.address);
	console.log("Reserve B: ", reserveB.address);

	console.log("======= Deploy Exchange =======");
	await deployer.deploy(Exchange);
    const exchangeContract = await Exchange.deployed();

	console.log("Exchange: ", exchangeContract.address);

	// Transfer init token to reserve
	let initialTokenAmount = web3.utils.toWei("100000", "ether");
	await tokenA.transfer(reserveA.address, initialTokenAmount, {
		from: accounts[0]
	});
	await tokenB.transfer(reserveB.address, initialTokenAmount, {
		from: accounts[0]
	});

	// Add Reserve to Exchange
	await exchangeContract.addReserve(reserveA.address, tokenA.address);
	await exchangeContract.addReserve(reserveB.address, tokenB.address);

	// add token to account 1
	await tokenA.transfer(accounts[1], web3.utils.toWei("100", "ether"), {
		from: accounts[0]
	});

	await tokenB.transfer(accounts[1], web3.utils.toWei("10", "ether"), {
		from: accounts[0]
	});

	console.log(accounts[1] + " has " + web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");
	console.log(accounts[1] + " has " + web3.utils.fromWei(await tokenB.balanceOf(accounts[1]), 'ether') + " TKB");

	console.log("Done");
};
