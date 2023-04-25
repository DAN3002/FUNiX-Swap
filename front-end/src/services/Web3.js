// eslint-disable-next-line import/no-extraneous-dependencies
import Web3 from 'web3';

import {
	TOKEN_ABI,
	EXCHANGE_ABI,
	EXCHANGE_ADDRESS,
} from '../config';

/**
 * Gets the web3 instance.
 * @returns {object} The web3 instance.
 */
export const getWeb3Instance = () => {
	if (window.web3) {
		return new Web3(window.web3.currentProvider);
	}
	return new Web3(Web3.givenProvider);
};

/**
 * Gets the token contract.
 * @param {string} tokenAddress - The token address.
 * @returns {object} The token contract.
 */
export const getTokenContract = (tokenAddress) => {
	const web3 = getWeb3Instance();
	const Contract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
	Contract.options.address = tokenAddress;

	return Contract;
};

/**
 * Gets the exchange contract.
 * @returns {object} The exchange contract.
 */
export const getExchangeContract = () => {
	const web3 = getWeb3Instance();
	const Contract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);
	Contract.options.address = EXCHANGE_ADDRESS;

	return Contract;
};

/**
 * Converts an amount to wei.
 *
 * @param {string} amount - The amount to convert to wei.
 * @returns {string} The amount in wei.
 */
export const convertToWei = (amount) => {
	const web3 = getWeb3Instance();
	return web3.utils.toWei(amount, 'ether');
};

/**
 * Converts an amount from wei.
 * @param {string} amount - The amount to convert from wei.
 * @returns {string} The amount in ether.
 */
export const convertFromWei = (amount) => {
	const web3 = getWeb3Instance();
	return web3.utils.fromWei(amount, 'ether');
};

/**
 * Gets the gas price.
 * @returns {string} The gas price.
 */
export const getGasPrice = () => {
	const web3 = getWeb3Instance();
	return web3.eth.getGasPrice();
};
