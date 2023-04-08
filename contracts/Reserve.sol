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

    function exchange(bool isBuy, uint256 amount) public payable {
        if (isBuy) {
            /*
				Buy supportedToken with ETH
				=> Contract recieves ETH and sends supportedToken
			 */
            // send supportedToken to msg.sender
			// get address of msg.sender
            supportedToken.approve(msg.sender, amount * buyRate);
            supportedToken.transfer(msg.sender, amount * buyRate);
        } else {
            /*
				Sell supportedToken for ETH
				=> Contract recieves supportedToken and sends ETH
			 */
            // send supportedToken to this contract
            // supportedToken.approve(msg.sender, amount);
            require(amount > 0, "amount must be greater than 0");
            // supportedToken.approve(msg.sender, amount);
            // supportedToken.transferFrom(msg.sender, address(this), 1);
            // supportedToken.allowance(msg.sender, address(this));

            // send ETH to msg.sender
            // msg.sender.transfer(msg.value * sellRate);
        }
    }

    // Check balance supportedToken of account
    function balanceOf(address account) public view returns (uint256) {
        return supportedToken.balanceOf(account);
    }
}
