import { useState } from 'react';

import { TOKENS } from '../config';

function SwapTokenModal() {
	const [sourceToken, setSourceToken] = useState(TOKENS[0]);
	const [destToken, setDestToken] = useState(TOKENS[1]);
	const [sourceAmount, setSourceAmount] = useState();

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
					<div className="input-placeholder">0</div>
				</div>
				<div className="swap__rate">1 KNC = 0.001047 ETH</div>
			</div>
			<div
				className="button modal-trigger"
				data-modal-id="confirm-swap-modal"
				id="swap-button"
			>
				Swap Now
			</div>
		</div>
	);
}

export default SwapTokenModal;
