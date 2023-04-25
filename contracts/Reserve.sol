pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Reserve {
    ERC20 public supportedToken;
    // 1 ETH = buyRate supportedToken
    uint256 buyRate;
    // 1 supportedToken = sellRate ETH
    uint256 sellRate;
    address public owner;

    constructor(
        address _supportedToken,
        uint256 _buyRate,
        uint256 _sellRate
    ) public {
        supportedToken = ERC20(_supportedToken);
        buyRate = _buyRate;
        sellRate = _sellRate;
        owner = msg.sender;
    }

    function setBuyRate(uint256 _buyRate) public onlyOwner {
        buyRate = _buyRate;
    }

    function setSellRate(uint256 _sellRate) public onlyOwner {
        sellRate = _sellRate;
    }

    function buyToken() public payable returns (uint256 sendBackAmount) {
        /*
            Buy supportedToken with ETH
            => Contract recieves ETH and sends supportedToken
        */
        require(msg.value > 0, "You must send ETH to buy tokens");

        uint256 tokenAmount = msg.value * buyRate;
        require(
            supportedToken.balanceOf(address(this)) >= tokenAmount,
            "Not enough token in the reserve"
        );

        // supportedToken.approve(msg.sender, tokenAmount);
        supportedToken.transfer(msg.sender, tokenAmount);

        return tokenAmount;
    }

    function sellToken(
        uint256 sellAmount
    ) public returns (uint256 sendBackAmount) {
        /*
            Sell supportedToken for ETH
            => Contract recieves supportedToken and sends ETH
        */
        uint256 ethAmount = sellAmount / sellRate;

        require(sellAmount > 0, "You must sell at least some token");
        require(
            supportedToken.balanceOf(msg.sender) >= sellAmount,
            "Not enough token in your account"
        );
        require(
            supportedToken.allowance(msg.sender, address(this)) >= sellAmount,
            "Not enough allowance for this contract"
        );
        require(
            address(this).balance >= ethAmount,
            "Not enough ETH in the reserve"
        );

        supportedToken.transferFrom(msg.sender, address(this), sellAmount);
        payable(msg.sender).transfer(ethAmount);

        return ethAmount;
    }

    function getBuyRate() public view returns (uint256) {
        return buyRate;
    }

    function getSellRate() public view returns (uint256) {
        return sellRate;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    receive() external payable {}
}
