/* eslint-disable jsx-a11y/label-has-associated-control */

function App() {
	return (
		<div className="container">
			<h1 className="main-title">FUNiX Swap</h1>
			<div className="main-content">
				<div className="tab-container">
					<div className="tab">
						<div
							className="tab__item tab__item--active"
							data-content-id="swap"
						>
							SWAP
						</div>
						<div className="tab__item" data-content-id="transfer">
							TRANSFER
						</div>
					</div>
				</div>
				<div className="swap active" id="swap">
					<div className="input-container">
						<label className="input-title" htmlFor="swap-source-amount">
							From:
						</label>
						<div className="input-group">
							<div className="dropdown">
								<div className="dropdown__trigger">
									<span>ETH</span>
									<div className="dropdown__triangle" />
								</div>
								<div className="dropdown__content">
									<div className="dropdown__item">ETH</div>
									<div className="dropdown__item">KNC</div>
								</div>
							</div>
							<input
								className="input-item"
								id="swap-source-amount"
								type="text"
								placeholder={0}
							/>
						</div>
					</div>
					<div className="swap__icon" />
					<div className="input-container">
						<div className="input-title">To:</div>
						<div className="input-group">
							<div className="dropdown">
								<div className="dropdown__trigger">
									<span>KNC</span>
									<div className="dropdown__triangle" />
								</div>
								<div className="dropdown__content">
									<div className="dropdown__item">ETH</div>
									<div className="dropdown__item">KNC</div>
								</div>
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
				<div className="transfer" id="transfer">
					<div className="input-container">
						<label
							className="input-title"
							htmlFor="transfer-source-amount"
						>
							From:
						</label>
						<div className="input-group">
							<div className="dropdown">
								<div className="dropdown__trigger">
									<span>ETH</span>
									<div className="dropdown__triangle" />
								</div>
								<div className="dropdown__content">
									<div className="dropdown__item">ETH</div>
									<div className="dropdown__item">KNC</div>
								</div>
							</div>
							<input
								className="input-item"
								id="transfer-source-amount"
								type="text"
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
							/>
						</div>
					</div>
					<div className="button">Transfer Now</div>
				</div>
				<div className="import-account">
					<div className="import-account__title">Connect with</div>
					<div className="import-account__container">
						<div className="import-account__item" id="import-metamask">
							<div className="import-account__icon metamask" />
							<div className="import-account__name">METAMASK</div>
						</div>
						<div
							className="import-account__item import-account__item--inactive"
							id="import-keystore"
						>
							<div className="import-account__icon keystore" />
							<div className="import-account__name">KEYSTORE</div>
						</div>
						<div
							className="import-account__item import-account__item--inactive"
							id="import-private-key"
						>
							<div className="import-account__icon private-key" />
							<div className="import-account__name">PRIVATE KEY</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
