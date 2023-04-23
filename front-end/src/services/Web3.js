// eslint-disable-next-line import/no-extraneous-dependencies
import Web3 from 'web3';

import {
	TOKEN_ABI,
	EXCHANGE_ABI,
	EXCHANGE_ADDRESS,
} from '../config';

export const getWeb3Instance = () => {
	if (window.web3) {
		return new Web3(window.web3.currentProvider);
	}
	return new Web3(Web3.givenProvider);
};

export const getTokenContract = (tokenAddress) => {
	const web3 = getWeb3Instance();
	const Contract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
	Contract.options.address = tokenAddress;

	return Contract;
};

export const getExchangeContract = () => {
	const web3 = getWeb3Instance();
	const Contract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);
	Contract.options.address = EXCHANGE_ADDRESS;

	return Contract;
};

export const convertToWei = (amount) => {
	const web3 = getWeb3Instance();
	return web3.utils.toWei(amount, 'ether');
};
