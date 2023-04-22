pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Reserve.sol";

contract Exchange {
	mapping (address => Reserve) public reserves;
	address ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

	constructor() {}

	function addReserve(address reserve, address token) onlyOwner public{
		reserves[token] = Reserve(reserve);
	}

	function exchange(addess srcToken, address destToken, uint256 amount) public payable {
		require(reserves[srcToken] != address(0), "Reserve for srcToken not found");
		require(reserves[destToken] != address(0), "Reserve for destToken not found");
		require(srcToken != destToken, "srcToken and destToken must be different");

		require(amount > 0, "Amount must be greater than 0");

		Reserve srcReserve = reserves[srcToken];
		Reserve destReserve = reserves[destToken];

		if (srcToken == ETH_ADDRESS) {
			// Swap ETH for destToken
			require(msg.value == amount, "Amount must be equal to msg.value");

			// Send ETH to srcReserve
			srcReserve.buyToken{value: amount}();

		}
	}

	modifier onlyOwner() {
        require(msg.sender == owner(), "Only owner can call this function");
        _;
    }
}
