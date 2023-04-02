export default {
	isInstalled: () => {
		return typeof window.ethereum !== 'undefined';
	},
	importWallet: () => {
		return window.ethereum
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => accounts[0]);
	},
	getBalance: (address) => {
		return window.web3.eth.getBalance(address);
	},
};
