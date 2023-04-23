import ExchangeContract from './abi/Exchange.json';
import TokenContract from './abi/Token.json';

export const RPC_ENDPOINT = 'http://localhost:8545';
export const EXCHANGE_ABI = ExchangeContract.abi;
export const TOKEN_ABI = TokenContract.abi;
export const EXCHANGE_ADDRESS = '0x1Ec0162215AD473031e05a72f4999133eea96342';

export const NATIVE_TOKEN = {
	name: 'Ether',
	symbol: 'ETH',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
};

export const TOKENS = [
	NATIVE_TOKEN,
	{
		name: 'Token A',
		symbol: 'TKA',
		address: '0xC65aB43bdA8C27CB7D216CbE50d1B55FfDAAe6F6',
	},
	{
		name: 'Token B',
		symbol: 'TKB',
		address: '0x11CC53678caf24f216b20D9E3839B57f506495e5',
	},
];
