import { getExchangeContract, convertToWei, getTokenContract } from '../Web3';
import MetaMask from '../MetaMask';
import { NATIVE_TOKEN, EXCHANGE_ADDRESS } from '../../config';

const ExchangeContract = getExchangeContract();

const Exchange = {
	getExchangeRate: async (sourceToken, destToken) => {
		const rate = await ExchangeContract.methods.getExchangeRate(sourceToken, destToken).call();
		return rate;
	},
	swapToken: async (swapInfo) => {
		const {
			sourceToken,
			destToken,
			sourceAmount,
		} = swapInfo;

		const sourceAmountInWei = convertToWei(sourceAmount);
		let transtionAmout = 0;
		if (sourceToken.address === NATIVE_TOKEN.address) {
			transtionAmout = sourceAmountInWei;
		} else {
			// Approve exchangeContract to spend sourceToken
			const sourceTokenContract = getTokenContract(sourceToken.address);

			await sourceTokenContract.methods.approve(
				EXCHANGE_ADDRESS,
				sourceAmountInWei,
			).send({
				from: MetaMask.getWalletAddress(),
			});
		}

		return ExchangeContract.methods.exchange(
			sourceToken.address,
			destToken.address,
			sourceAmount,
		).send({
			from: MetaMask.getWalletAddress(),
			value: transtionAmout,
		});
	},
};

export default Exchange;
