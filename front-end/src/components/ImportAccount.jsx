import Swal from 'sweetalert2';

import MetaMask from '../services/MetaMask';

function ImportAccount() {
	const importWalletWithMetaMask = async () => {
		// check if metamask is installed
		if (!MetaMask.isInstalled()) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Metamask is not installed',
			});
			return;
		}

		// importWallet with metamask
		await MetaMask.importWallet();

		Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Wallet imported successfully',
		});
	};
	return (
		<div className="import-account">
			<div className="import-account__title">Connect with</div>
			<div className="import-account__container">
				<div
					className="import-account__item"
					id="import-metamask"
					onClick={importWalletWithMetaMask}
				>
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
