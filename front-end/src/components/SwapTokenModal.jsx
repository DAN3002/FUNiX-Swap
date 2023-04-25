import { useState, useEffect } from 'react';

import { TOKENS } from '../config';
import Exchange from '../services/contracts/Exchange';
import modal from '../utils/modal';
import Metamask from '../services/MetaMask';

const validateSwapInfo = async (swapInfo) => {
	const { sourceToken, destToken, sourceAmount } = swapInfo;

	// check if too token are the same
	if (sourceToken.symbol === destToken.symbol) {
		return 'Source token and destination token must be different';
	}

	// check if source amount is valid
	if (!sourceAmount || sourceAmount <= 0) {
		return 'Source amount must be greater than 0';
	}

	// Check if source token balance is enough
	const currentBalance = await Metamask.getCurrentBalanceByTokenAddress(sourceToken.address);
	if (currentBalance < sourceAmount) {
		return `You don't have enough ${sourceToken.symbol} to swap`;
	}

	return null;
};

function SwapTokenModal() {
	const [sourceToken, setSourceToken] = useState(TOKENS[0]);
	const [destToken, setDestToken] = useState(TOKENS[1]);
	const [sourceAmount, setSourceAmount] = useState();
	const [destAmount, setDestAmount] = useState();
	const [rate, setRate] = useState();

	useEffect(() => {
		const getRate = async () => {
			let rateValue = await Exchange.getExchangeRate(sourceToken.address, destToken.address, sourceAmount);
			rateValue /= 1e18;
			setRate(rateValue);
			setDestAmount((sourceAmount || 0) * parseFloat(rateValue));
		};

		getRate();
	}, [sourceToken, destToken, sourceAmount]);

	const handleSwap = async () => {
		const swapInfo = {
			sourceToken,
			destToken,
			sourceAmount,
			destAmount,
			rate,
		};

		const validate = await validateSwapInfo(swapInfo);

		if (validate) {
			modal.showAlert(validate);
			return;
		}
		const res = await modal.showConfirmSwap(swapInfo);
		if (res.isConfirmed) {
			try {
				modal.showLoading();
				await Exchange.swapToken(swapInfo);
				modal.closeAll();
				modal.showSuccess('Swap successfully');
			} catch (error) {
				modal.closeAll();
				modal.showAlert(error.message);
			}

			// reset form
			setSourceAmount('');
		}
	};

	return (
		<div className="swap active" id="swap">
			<div className="input-container">
				<label className="input-title" htmlFor="swap-source-amount">
					From:
				</label>
				<div className="input-group">
					<div className="dropdown">
						<select
							className="dropdown__trigger"
							onChange={(e) => setSourceToken(TOKENS[e.target.value])}
						>
							{TOKENS.map((token, i) => (
								<option key={token.symbol} value={i} selected={token.symbol === sourceToken.symbol}>
									{token.symbol}
								</option>
							))}
						</select>
					</div>
					<input
						className="input-item"
						id="swap-source-amount"
						type="number"
						placeholder={0}
						value={sourceAmount}
						onChange={(e) => setSourceAmount(e.target.value)}
					/>
				</div>
			</div>
			<div className="swap__icon" />
			<div className="input-container">
				<div className="input-title">To:</div>
				<div className="input-group">
					<div className="dropdown">
						<select
							className="dropdown__trigger"
							onChange={(e) => setDestToken(TOKENS[e.target.value])}
						>
							{TOKENS.map((token, i) => (
								<option key={token.symbol} value={i} selected={token.symbol === destToken.symbol}>
									{token.symbol}
								</option>
							))}
						</select>
					</div>
					<div className="input-placeholder">{destAmount}</div>
				</div>
				<div className="swap__rate">{`1 ${sourceToken.symbol} = ${rate} ${destToken.symbol}`}</div>
			</div>
			<div
				className="button modal-trigger"
				data-modal-id="confirm-swap-modal"
				id="swap-button"
				onClick={handleSwap}
			>
				Swap Now
			</div>
		</div>
	);
}

export default SwapTokenModal;
