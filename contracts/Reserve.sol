pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Reserve {
    ERC20 public supportedToken;
    // 1 ETH = buyRate supportedToken
    uint256 public buyRate;
    // 1 supportedToken = sellRate ETH
    uint256 public sellRate;

    constructor(
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
            supportedToken.approve(msg.sender, amount * buyRate);
            supportedToken.transfer(msg.sender, amount * buyRate);
        } else {
            /*
				Sell supportedToken for ETH
				=> Contract recieves supportedToken and sends ETH
			 */
            supportedToken.transferFrom(msg.sender, address(this), amount);
            payable(msg.sender).transfer(amount / sellRate);
        }
    }

    // Check balance supportedToken of account
    function balanceOf(address account) public view returns (uint256) {
        return supportedToken.balanceOf(account);
    }
}
