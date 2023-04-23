/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';

import MetaMask from '../services/MetaMask';
import { TOKENS } from '../config';

function BalanceModal() {
	const [walletAddress, setWalletAddress] = useState();
	const [token, setToken] = useState({});
	const [balance, setBalance] = useState(0);

	const fetchBalance = async () => {
		if (token) {
			// console.log('token', token);
			setBalance(await MetaMask.getCurrentBalanceByToken(token));
		}
	};

	useEffect(() => {
		setWalletAddress(MetaMask.getWalletAddress());
		setToken(TOKENS[0]);
		setBalance(100);

		const inter = setInterval(() => {
			fetchBalance();
		}, 1 * 1000);

		return () => {
			clearInterval(inter);
		};
	}, []);

	useEffect(() => {
		fetchBalance();
	}, [token]);

	return (
		<div className="transfer" id="transfer">
			<div className="input-container">
				<div>
					<div className="input-container">
						<label className="input-title" htmlFor="wallet-address">
							Wallet Address:
						</label>
						<div className="input-group">
							<input
								disabled
								className="input-item input-item--single"
								type="text"
								id="wallet-address"
								name="wallet-address"
								value={walletAddress}
							/>
						</div>
					</div>
					<div className="input-container--mt">
						<label className="input-title" htmlFor="wallet-token">
							Token:
						</label>
						<div className="input-group">
							<select
								id="token-list"
								className="input-item"
								onChange={(e) => {
									setToken(TOKENS[e.target.value]);
								}}
							>
								{TOKENS.map((tokenEl, i) => (
									<option
										value={i}
										key={tokenEl.symbol}
										selected={tokenEl.symbol === token.symbol}
									>
										{`${tokenEl.symbol} - ${tokenEl.name}`}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="input-container--mt">
						<label className="input-title" htmlFor="wallet-balance">
							Left balance:
						</label>
						<div className="input-group">
							<input
								disabled
								className="input-item input-item--single"
								type="number"
								id="wallet-balance"
								value={balance}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BalanceModal;
