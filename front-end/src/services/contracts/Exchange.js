import { getExchangeContract, convertToWei, getTokenContract } from '../Web3';
import MetaMask from '../MetaMask';
import { NATIVE_TOKEN, EXCHANGE_ADDRESS } from '../../config';

const ExchangeContract = getExchangeContract();

const Exchange = {
	/**
	 * Gets the exchange ABI.
	 * @param {object} sourceToken - The source token.
	 * @param {object} destToken - The destination token.
	 * @returns {string} The exchange rate.
	 */
	getExchangeRate: async (sourceToken, destToken) => {
		const rate = await ExchangeContract.methods.getExchangeRate(sourceToken, destToken).call();
		return rate;
	},

	/**
	 * Gets the exchange ABI.
	 * @param {object} sourceToken - The source token.
	 * @param {object} destToken - The destination token.
	 * @param {string} amount - The amount to swap.
	 * @returns {object} The exchange ABI.
	 */
	swapToken: async (swapInfo) => {
		const {
			sourceToken,
			destToken,
			sourceAmount,
		} = swapInfo;

		const sourceAmountInWei = convertToWei(`${sourceAmount}`);
		let transactionAmout = 0;
		if (sourceToken.address === NATIVE_TOKEN.address) {
			transactionAmout = sourceAmountInWei;
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
			sourceAmountInWei,
		).send({
			from: MetaMask.getWalletAddress(),
			value: transactionAmout,
		});
	},

	/**
	 * Gets the exchange ABI.
	 * @param {object} sourceToken - The source token.
	 * @param {object} destToken - The destination token.
	 * @param {string} amount - The amount to swap.
	 * @returns {object} The exchange ABI.
	 */
	getExchangeABI: (sourceToken, destToken, amount) => {
		const sourceAmountInWei = convertToWei(`${amount}`);
		return ExchangeContract.methods.exchange(
			sourceToken.address,
			destToken.address,
			sourceAmountInWei,
		);
	},
};

export default Exchange;
