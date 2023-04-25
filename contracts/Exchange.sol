pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Reserve.sol";

contract Exchange {
    address public owner;
    mapping(address => Reserve) public reserves;
    address ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function addReserve(
        address payable reserve,
        address token
    ) public onlyOwner {
        reserves[token] = Reserve(reserve);
    }

    function deleteReserve(address token) public onlyOwner {
        delete reserves[token];
    }

    /**
     * @dev Exchange ETH or supported token for another supported token
     * @param srcToken address of source token
     * @param destToken address of destination token
     * @param amount amount of source token to exchange
     * @return sendBackAmount amount of destination token received
     */
    function exchange(
        address srcToken,
        address destToken,
        uint256 amount
    ) public payable {
        require(
            srcToken != destToken,
            "srcToken and destToken must be different"
        );
        require(amount > 0, "Amount must be greater than 0");

        Reserve srcReserve = reserves[srcToken];
        Reserve destReserve = reserves[destToken];

        if (srcToken == ETH_ADDRESS) {
            // Swap ETH for destToken
            require(msg.value == amount, "Amount must be equal to msg.value");
            require(srcToken != address(0), "srcToken does not exist");

            ERC20 destTokenContract = ERC20(destToken);

            // Send ETH to srcReserve and get destToken to Exchange
            uint256 sendBackAmount = destReserve.buyToken{value: amount}();

            // send token from the Exchange to the user
            destTokenContract.transfer(msg.sender, sendBackAmount);
        } else if (destToken == ETH_ADDRESS) {
            // Swap srcToken for ETH
            require(destToken != address(0), "srcReserve does not exist");

            ERC20 srcTokenContract = ERC20(srcToken);

            // recive token from sender
            srcTokenContract.transferFrom(msg.sender, address(this), amount);

            // approve srcReserve to spend token
            srcTokenContract.approve(address(srcReserve), amount);

            // Send token to srcReserve and get ETH to Exchange
            uint256 sendBackAmount = srcReserve.sellToken(amount);

            // send ETH from the Exchange to the user
            payable(msg.sender).transfer(sendBackAmount);
        } else {
            // Swap srcToken for destToken
            require(srcToken != address(0), "srcReserve does not exist");
            require(destToken != address(0), "destReserve does not exist");

            ERC20 srcTokenContract = ERC20(srcToken);
            ERC20 destTokenContract = ERC20(destToken);

            // recive token from sender
            srcTokenContract.transferFrom(msg.sender, address(this), amount);

            // approve srcReserve to spend token
            srcTokenContract.approve(address(srcReserve), amount);

            // Send token to srcReserve and get destToken to Exchange
            uint256 ethRecived = srcReserve.sellToken(amount);

            // buy destToken with ETH
            uint256 sendBackAmount = destReserve.buyToken{value: ethRecived}();

            // send token from the Exchange to the user
            destTokenContract.transfer(msg.sender, sendBackAmount);
        }
    }

    function getExchangeRate(
        address srcToken,
        address destToken
    ) public view returns (uint256) {
        if (srcToken == ETH_ADDRESS) {
            return 1e18 * reserves[destToken].getBuyRate();
        } else if (destToken == ETH_ADDRESS) {
            return 1e18 / reserves[srcToken].getSellRate();
        } else if (srcToken == destToken) {
            return 1e18;
        } else {
            return
                (1e18 * reserves[destToken].getBuyRate()) /
                reserves[srcToken].getSellRate();
        }
    }

    receive() external payable {}
}
