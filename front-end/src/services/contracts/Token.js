import { getTokenContract, convertToWei, getWeb3Instance } from '../Web3';
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
		if (sourceToken.address === NATIVE_TOKEN.address) {
			// transfer eth to destAddress using sendTransaction
			const web3 = getWeb3Instance();
			return web3.eth.sendTransaction({
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
