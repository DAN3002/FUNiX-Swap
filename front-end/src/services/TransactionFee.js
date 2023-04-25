import Exchange from './contracts/Exchange';
import {
	NATIVE_TOKEN,
} from '../config';
import MetaMask from './MetaMask';
import {
	getGasPrice,
	convertFromWei,
} from './Web3';

/**
 * Gets the swap fee.
 * @param {object} sourceToken - The source token.
 * @param {object} destToken - The destination token.
 * @param {string} amount - The amount to swap.
 * @returns {string} The swap fee.
 */
const _getSwapFee = async (sourceToken, destToken, amount) => {
	let gasAmount = 0;
	const gasPrice = await getGasPrice();
	if (sourceToken.address === NATIVE_TOKEN.address) {
		gasAmount = await Exchange.getExchangeABI(NATIVE_TOKEN, destToken, amount).estimateGas({
			from: MetaMask.getWalletAddress(),
		});
	} else if (destToken.address === NATIVE_TOKEN.address) {
		const rate = (await Exchange.getExchangeRate(sourceToken.address, NATIVE_TOKEN.address)) / 1e18;

		const newAmount = amount * rate;
		return Exchange.getExchangeABI(NATIVE_TOKEN, destToken, newAmount).estimateGas({
			from: MetaMask.getWalletAddress(),
		});
	} else {
		const srcFee = await _getSwapFee(sourceToken, NATIVE_TOKEN, amount);
		const rate = (await Exchange.getExchangeRate(sourceToken.address, destToken.address)) / 1e18;

		const destFee = await _getSwapFee(NATIVE_TOKEN, destToken, amount * rate);

		return srcFee + destFee;
	}
	return gasAmount * gasPrice;
};

/**
 * Gets the gas fee in ether.
 * @param {object} sourceToken - The source token.
 * @param {object} destToken - The destination token.
 * @param {string} amount - The amount to swap.
 * @returns {string} The gas fee in ether.
 */
export const getSwapFee = async (sourceToken, destToken, amount) => {
	const fee = await _getSwapFee(sourceToken, destToken, amount);
	return convertFromWei(fee);
};

export const getTransferFee = () => {};
