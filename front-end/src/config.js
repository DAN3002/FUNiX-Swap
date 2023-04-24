import ExchangeContract from './abi/Exchange.json';
import TokenContract from './abi/Token.json';

// export const RPC_ENDPOINT = 'http://localhost:8545';
export const RPC_ENDPOINT = 'https://testnet.tomochain.com';
export const EXCHANGE_ABI = ExchangeContract.abi;
export const TOKEN_ABI = TokenContract.abi;
export const EXCHANGE_ADDRESS = '0xF9a2ba70C0C958D29f3fEcA49c45D97634FA5Af6';

// export const NATIVE_TOKEN = {
// 	name: 'Ether',
// 	symbol: 'ETH',
// 	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
// };
export const NATIVE_TOKEN = {
	name: 'TomoChain',
	symbol: 'TOMO',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
};

export const TOKENS = [
	NATIVE_TOKEN,
	{
		name: 'Token A',
		symbol: 'TKA',
		address: '0x442EE946d3746e19DB87eE997d8866eCb3c4979d',
	},
	{
		name: 'Token B',
		symbol: 'TKB',
		address: '0xE895310d8Bc5A35173F45CE6200D93d46C72657d',
	},
];
