function ImportAccount() {
	return (
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
	);
}

export default ImportAccount;
