pragma solidity ^0.4.17;

import "./ERC20.sol";

contract Reserve {
    ERC20 public supportedToken;
    // 1 ETH = buyRate supportedToken
    uint256 public buyRate;
    // 1 supportedToken = sellRate ETH
    uint256 public sellRate;

    function Reserve(
        address _supportedToken,
        uint256 _buyRate,
        uint256 _sellRate
    ) public {
        supportedToken = ERC20(_supportedToken);
        buyRate = _buyRate;
        sellRate = _sellRate;
    }

    function exchange(bool isBuy) public payable {
        if (isBuy) {
            /*
				Buy supportedToken with ETH
				=> Contract recieves ETH and sends supportedToken
			 */
            // send supportedToken to msg.sender
			// get address of msg.sender
            supportedToken.approve(msg.sender, msg.value * buyRate);
            supportedToken.transfer(msg.sender, msg.value * buyRate);
        } else {
            /*
				Sell supportedToken for ETH
				=> Contract recieves supportedToken and sends ETH
			 */
        }
    }

    // Check balance supportedToken of account
    function balanceOf(address account) public view returns (uint256) {
        return supportedToken.balanceOf(account);
    }
}
