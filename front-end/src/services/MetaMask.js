/* eslint-disable no-else-return */
import {
	getTokenContract,
	getWeb3Instance,
} from './Web3';
import {
	NATIVE_TOKEN,
} from '../config';

export default {
	/**
	 * Checks if MetaMask is installed.
	 * @returns {boolean} True if MetaMask is installed, false otherwise.
	 */
	isInstalled: () => {
		return typeof window.ethereum !== 'undefined';
	},

	/**
	 * Checks if MetaMask is connected.
	 * @returns {boolean} True if MetaMask is connected, false otherwise.
	 */
	importWallet: () => {
		return window.ethereum
			.request({
				method: 'eth_requestAccounts',
			})
			.then((accounts) => accounts[0]);
	},

	/**
	 * Gets the wallet address.
	 * @returns {string} The wallet address.
	 */
	getWalletAddress: () => {
		return window.ethereum.selectedAddress;
	},

	/**
	 * Gets the current balance.
	 * @returns {string} The current balance.
	 * @param {string} tokenAddress - The token address.
	 * @returns {string} The current balance.
	 */
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
