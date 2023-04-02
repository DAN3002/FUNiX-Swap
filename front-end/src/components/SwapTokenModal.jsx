function SwapTokenModal() {
	return (
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
	);
}

export default SwapTokenModal;
