function TransferTokenModal() {
	return (
		<div className="transfer" id="transfer">
			<div className="input-container">
				<label className="input-title" htmlFor="transfer-source-amount">
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
	);
}

export default TransferTokenModal;
