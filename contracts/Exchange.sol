pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Reserve.sol";

contract Exchange {
	address public owner;
	mapping (address => Reserve) public reserves;
	address ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

	constructor() {
		owner = msg.sender;
	}

	modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

	function addReserve(address reserve, address token) onlyOwner public{
		reserves[token] = Reserve(reserve);
	}

	function exchange(address srcToken, address destToken, uint256 amount) public payable {
		Reserve srcReserve = reserves[srcToken];
		Reserve destReserve = reserves[destToken];

		require(srcToken != destToken, "srcToken and destToken must be different");
		require(amount > 0, "Amount must be greater than 0");

		if (srcToken == ETH_ADDRESS) {
			// Swap ETH for destToken
			require(msg.value == amount, "Amount must be equal to msg.value");
			// require(destReserve != address(0), "destReserve does not exist");

			ERC20 destTokenContract = ERC20(destToken);

			// Send ETH to srcReserve and get destToken to Exchange
			uint256 sendBackAmount =  srcReserve.buyToken{value: amount}();

			// send token from the Exchange to the user
			destTokenContract.transferFrom(address(this), msg.sender, sendBackAmount);
		}
	}
}
