// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

//Sepolia USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
contract PaymentRequest {
    using SafeMath for uint256;
    
    IERC20 public token;

    struct Payment{
        uint256 amount;
        address receiver;
        bool completed;
    }

    mapping(bytes32 => Payment) public payments;
    mapping(address => bytes32[]) public userPaymentIds;

    event PaymentRequested(bytes32 indexed paymentId, address requester, uint256 amount);
    event PaymentFulfilled(bytes32 indexed paymentId, address payer, uint256 amount);
    
    /** Initialize Payment Manager Contract */
    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    /** Generate a Random Payment ID*/
    function generateRandomId(address _requester, uint256 _amount) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(_requester, _amount, block.timestamp, block.prevrandao));
    }

    /** Request a Payment with a specified amount */
    function requestPayment(uint256 _amount) external returns (bytes32) {
        // Check if the requested amount is valid
        require(_amount > 0, "Amount must be greater than 0");
        
        bytes32 paymentId = generateRandomId(msg.sender, _amount);
        // Check if the paymentId has existed before
        require(payments[paymentId].receiver == address(0), "PaymentId already exists. Please try again");

        // Initialize the payment
        payments[paymentId] = Payment({
            amount: _amount,
            receiver: msg.sender,
            completed: false
        });

        userPaymentIds[msg.sender].push(paymentId);

        emit PaymentRequested(paymentId, msg.sender, _amount);
        return paymentId;
    }

    /** Function for user to initialize a payment based on the payment ID */
    function fulfillPayment(bytes32 _paymentId) external {
        // Fetch the payment data
        Payment storage payment = payments[_paymentId];
        require(!payment.completed, "Payment already completed");
        require(payment.amount > 0, "Invalid payment");

        // Process the payment by transferring it to the user
        require(token.transferFrom(msg.sender, payment.receiver, payment.amount), "Transfer failed");
        payment.completed = true;
        emit PaymentFulfilled(_paymentId, msg.sender, payment.amount);
    }

    /** Function get details of a payment with the ID */
    function getPaymentDetails(bytes32 _paymentId) external view returns (address, uint256, bool) {
        Payment storage payment = payments[_paymentId];
        return (payment.receiver, payment.amount, payment.completed);
    }

    /** Function to get the Payment IDs initialized by the user */
    function getUserPaymentIds(address _user) external view returns (bytes32[] memory) {
        return userPaymentIds[_user];
    }
}