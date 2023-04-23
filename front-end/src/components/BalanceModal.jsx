/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';

import MetaMask from '../services/MetaMask';
import { TOKEN_LIST } from '../config';

function BalanceModal() {
	const [walletAddress, setWalletAddress] = useState();
	const [token, setToken] = useState('');
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		setWalletAddress(MetaMask.getWalletAddress());
		setToken(TOKEN_LIST[0]);
		setBalance(100);
	}, []);

	useEffect(() => {
		const fetchBalance = async () => {
			setBalance(await MetaMask.getCurrentBalanceByToken(token));
		};
		if (token) {
			fetchBalance();
		}
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
							<datalist id="token-list">
								{TOKEN_LIST.map((tokenName) => (
									<option value={tokenName} key={tokenName} />
								))}
							</datalist>
							<input
								className="input-item"
								type="text"
								id="wallet-token"
								name="wallet-token"
								autoComplete="on"
								list="token-list"
								value={token}
							/>
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
