import ExchangeContract from './abi/Exchange.json';
import TokenContract from './abi/Token.json';

export const RPC_ENDPOINT = 'http://localhost:8545';
export const EXCHANGE_ABI = ExchangeContract.abi;
export const TOKEN_ABI = TokenContract.abi;
export const EXCHANGE_ADDRESS = '0xFaA0991f37bfBE099c9E0C682956c5DFb2FC9FCF';
export const TOKENS = [{
	name: 'Ether',
	symbol: 'ETH',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
},
{
	name: 'Token A',
	symbol: 'TKA',
	address: '0x1d30d1de6767814ffC01D1A757d0789d067585e9',
},
{
	name: 'Token B',
	symbol: 'TKB',
	address: '0xa3Ec437acEC6B2eCd48f7891d90D059D59a72C5F',
}];
