import ExchangeContract from './abi/Exchange.json';
import TokenContract from './abi/Token.json';

export const RPC_ENDPOINT = 'http://localhost:8545';
export const EXCHANGE_ABI = ExchangeContract.abi;
export const TOKEN_ABI = TokenContract.abi;
export const EXCHANGE_ADDRESS = '0x27eE5850Ab8FE6Ca641a15b73c6b2D549cab94E6';

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
		address: '0xFDB4EDc3d924362a5b79bdB4FC18DE55Fe38520c',
	},
	{
		name: 'Token B',
		symbol: 'TKB',
		address: '0x539cB8A3695F1E6636eEea059d4804F65f0d3495',
	},
];
