/* eslint-disable no-else-return */
import { getTokenContract, getWeb3Instance } from './Web3';
import { NATIVE_TOKEN } from '../config';

export default {
	isInstalled: () => {
		return typeof window.ethereum !== 'undefined';
	},
	importWallet: () => {
		return window.ethereum
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => accounts[0]);
	},
	getWalletAddress: () => {
		return window.ethereum.selectedAddress;
	},
	getCurrentBalanceByTokenAddress: async (tokenAddress) => {
		if (tokenAddress === NATIVE_TOKEN.address) {
			const web3 = getWeb3Instance();
			const balance = await web3.eth.getBalance(window.ethereum.selectedAddress);
			// convert to ether
			return window.web3.fromWei(balance, 'ether');
		} else {
			const tokenContract = getTokenContract(tokenAddress);
			const balance = await tokenContract.methods.balanceOf(window.ethereum.selectedAddress).call();
			return window.web3.fromWei(balance, 'ether');
		}
	},
};
