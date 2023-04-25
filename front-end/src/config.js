import ExchangeContract from './abi/Exchange.json';
import TokenContract from './abi/Token.json';

// export const RPC_ENDPOINT = 'http://localhost:8545';
export const RPC_ENDPOINT = 'https://testnet.tomochain.com';
export const EXCHANGE_ABI = ExchangeContract.abi;
export const TOKEN_ABI = TokenContract.abi;
export const BALANCE_REFRESH_INTERVAL = 10 * 1000;
export const EXCHANGE_ADDRESS = '0x00711c309D38ae7Eeebe25326095fF86a8052689';

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
		address: '0xe608239b6D00323A104cCcF7255c58e878599009',
	},
	{
		name: 'Token B',
		symbol: 'TKB',
		address: '0x201c6eFFb5cc71470086E9E223Fb4CA743974262',
	},
];
