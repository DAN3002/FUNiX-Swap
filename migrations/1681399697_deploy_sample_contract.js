const Reserve = artifacts.require("Reserve");
const Token = artifacts.require("Token");

const gasLimit = 2206142;

module.exports = async function(deployer, network, accounts) {
	  // Use deployer to state migration tasks.
	  const tokenA = await Token.new("TokenA", "TKA", 18);
	  const tokenB = await Token.new("TokenB", "TKB", 18);

	  const reserveA = await Reserve.new(tokenA.address, 100, 100, {gas: gasLimit})

	  let initialTokenAmount = web3.utils.toWei("10000000000", "ether");
	  await tokenA.transfer(reserveA.address, initialTokenAmount, {from: accounts[0]});

	  console.log("Balance of reserveA: ", web3.utils.fromWei(await tokenA.balanceOf(reserveA.address), 'ether') + " TKA");

	  console.log("============ Checking reserveA ============");
	  console.log("Before Balance of Account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");

	  const srcAmount = web3.utils.toWei("1", "ether");
	  await reserveA.exchange(true, {from: accounts[1], value: srcAmount})

	  console.log("After Balance of Account 1: ", web3.utils.fromWei(await tokenA.balanceOf(accounts[1]), 'ether') + " TKA");
};
