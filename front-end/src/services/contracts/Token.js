import { getTokenContract, convertToWei } from '../Web3';
import MetaMask from '../MetaMask';

import { NATIVE_TOKEN } from '../../config';

const Token = {
	transferToken: (transferInfo) => {
		const {
			sourceToken,
			destAddress,
			sourceAmount,
		} = transferInfo;

		const amountInWei = convertToWei(`${sourceAmount}`);
		if (sourceToken === NATIVE_TOKEN.address) {
			// transfer native token to destAddress
			return window.web3.eth.sendTransaction({
				from: MetaMask.getWalletAddress(),
				to: destAddress,
				value: amountInWei,
			});
		}

		// transfer token to destAddress
		const tokenContract = getTokenContract(sourceToken.address);

		// approve token to transfer
		tokenContract.methods.approve(destAddress, amountInWei).send({
			from: MetaMask.getWalletAddress(),
		});

		// transfer token to destAddress
		return tokenContract.methods.transfer(destAddress, amountInWei).send({
			from: MetaMask.getWalletAddress(),
		});
	},
};

export default Token;
