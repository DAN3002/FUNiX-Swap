// eslint-disable-next-line import/no-extraneous-dependencies
import Web3 from 'web3';

import {
	TOKEN_ABI,
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
