import { getExchangeContract } from '../Web3';

const ExchangeContract = getExchangeContract();

const Exchange = {
	getExchangeRate: async (sourceToken, destToken) => {
		const rate = await ExchangeContract.methods.getExchangeRate(sourceToken, destToken).call();
		return rate;
	},
};

export default Exchange;
