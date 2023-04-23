const Reserve = artifacts.require("Reserve");
const Token = artifacts.require("Token");
const Exchange = artifacts.require("Exchange");

const gasLimit = 2206142;

module.exports = async function (deployer, network, accounts) {
	console.log("Start deploy contract");
	console.log("Deploying on network: " + network);
    console.log("Deployer account: " + accounts[0]);

	console.log("======= Deploy Token =======");
	const tokenA = await Token.new("TokenA", "TKA", 18);
	const tokenB = await Token.new("TokenB", "TKB", 18);
	console.log("Token A: ", tokenA.address);
	console.log("Token B: ", tokenB.address);

	console.log("======= Deploy Reserve =======");
	const reserveA = await Reserve.new(tokenA.address, 100, 100, {
		gas: gasLimit
	});
	const reserveB = await Reserve.new(tokenB.address, 100, 100, {
		gas: gasLimit
	});
	console.log("Reserve A: ", reserveA.address);
	console.log("Reserve B: ", reserveB.address);

	console.log("======= Deploy Exchange =======");
	await deployer.deploy(Exchange);
    const exchangeContract = await Exchange.deployed();

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

	console.log("Done");
};
