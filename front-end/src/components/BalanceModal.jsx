/* eslint-disable jsx-a11y/control-has-associated-label */
function BalanceModal() {
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
								className="input-item"
								type="text"
								id="wallet-address"
								name="wallet-address"
								defaultValue={
									0x0000000000000000000000000000000000000000
								}
							/>
						</div>
					</div>
					<div className="input-container--mt">
						<label className="input-title" htmlFor="wallet-token">
							Token:
						</label>
						<div className="input-group">
							<datalist id="token-list">
								<option value="TokenA (TKA)" />
								<option value="TokenC (TKC)" />
							</datalist>
							<input
								className="input-item"
								type="text"
								id="wallet-token"
								name="wallet-token"
								autoComplete="on"
								list="token-list"
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
								className="input-item"
								type="number"
								id="wallet-balance"
								placeholder={1}
								defaultValue={1}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BalanceModal;
