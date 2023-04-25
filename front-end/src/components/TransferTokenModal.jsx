import { useState } from 'react';

import { TOKENS } from '../config';
import modal from '../utils/modal';
import Token from '../services/contracts/Token';
import MetaMask from '../services/MetaMask';
import { checkValidAddress } from '../services/Web3';

const validateTransfer = async (transferInfo) => {
	const { destAddress, sourceAmount } = transferInfo;

	// check if source amount is valid
	if (!sourceAmount || sourceAmount <= 0) {
		return 'Source amount must be greater than 0';
	}

	// check if dest address is valid
	if (!destAddress) {
		return 'Destination address must be provided';
	}

	// check if dest address is valid
	if (!checkValidAddress(destAddress)) {
		return 'Destination address is invalid';
	}

	// Check if source token balance is enough
	const currentBalance = await MetaMask.getCurrentBalanceByTokenAddress(transferInfo.sourceToken.address);
	if (currentBalance < sourceAmount) {
		return `You don't have enough ${transferInfo.sourceToken.symbol} to transfer`;
	}

	return null;
};

function TransferTokenModal() {
	const [sourceToken, setSourceToken] = useState(TOKENS[0]);
	const [sourceAmount, setSourceAmount] = useState();
	const [destAddress, setDestAddress] = useState();

	const handleTransfer = async () => {
		const transferInfo = {
			sourceToken,
			destAddress,
			sourceAmount,
		};

		const validate = await validateTransfer(transferInfo);

		if (validate) {
			modal.showAlert(validate);
			return;
		}

		const res = await modal.showConfirmTransfer(transferInfo);
		if (res.isConfirmed) {
			try {
				modal.showLoading();
				await Token.transferToken(transferInfo);
				modal.closeAll();
				modal.showSuccess('Transfer successfully');
			} catch (error) {
				modal.closeAll();
				modal.showAlert(error.message);
			}

			setSourceAmount(0);
			setDestAddress('');
		}
	};

	return (
		<div className="transfer" id="transfer">
			<div className="input-container">
				<label className="input-title" htmlFor="transfer-source-amount">
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
						id="transfer-source-amount"
						type="number"
						placeholder={0}
						value={sourceAmount}
						onChange={(e) => setSourceAmount(e.target.value)}
					/>
				</div>
			</div>
			<div className="input-container input-container--mt">
				<label className="input-title" htmlFor="transfer-address">
					To Address:
				</label>
				<div className="input-group">
					<input
						className="input-item input-item--single"
						id="transfer-address"
						type="text"
						value={destAddress}
						onChange={(e) => setDestAddress(e.target.value)}
					/>
				</div>
			</div>
			<div
				className="button"
				onClick={handleTransfer}
			>
				Transfer Now
			</div>
		</div>
	);
}

export default TransferTokenModal;
