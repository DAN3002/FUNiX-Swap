export default {
	isInstalled: () => {
		return typeof window.ethereum !== 'undefined';
	},
	importWallet: () => {
		return window.ethereum
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => accounts[0]);
	},
	getWalletAddress: () => {
		return window.ethereum.selectedAddress;
	},
	getCurrentBalanceByToken: async (token) => {
		if (token === 'ETH') {
			const balance = await window.ethereum.request({
				method: 'eth_getBalance',
				params: [window.ethereum.selectedAddress, 'latest'],
			});

			// convert to ether
			return window.web3.fromWei(balance, 'ether');
		}
		return 1000;
	},
};
