pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Reserve.sol";

contract Exchange {
	mapping (address => Reserve) public reserves;

	constructor() {}

	function addReserve(address reserve, address token) onlyOwner public{
		reserves[token] = Reserve(reserve);
	}

	modifier onlyOwner() {
        require(msg.sender == owner(), "Only owner can call this function");
        _;
    }
}
