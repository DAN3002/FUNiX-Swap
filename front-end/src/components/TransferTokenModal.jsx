import { useState } from 'react';

import { TOKENS } from '../config';

function TransferTokenModal() {
	const [sourceToken, setSourceToken] = useState(TOKENS[0]);
	const [sourceAmount, setSourceAmount] = useState();
	const [destAddress, setDestAddress] = useState();

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
			<div className="button">Transfer Now</div>
		</div>
	);
}

export default TransferTokenModal;
