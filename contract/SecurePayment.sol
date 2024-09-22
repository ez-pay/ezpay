// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@fhenixprotocol/contracts/FHE.sol"; // Using FHE library for encryption and decryption

contract SecurePayment {
    struct EncryptedPayment {
        address sender;
        address receiver;
        euint256 encryptedAmount;
        euint8[] encryptedChatHistory;
    }

    mapping(uint256 => EncryptedPayment) public payments;
    uint256 public paymentCounter;

    // Add a new encrypted payment
    function createPayment(
        address receiver,
        uint256 amount,
        string calldata chatMessage
    ) public {
        paymentCounter++;
        
        // Encrypt the amount and chat message
        euint256 encryptedAmount = FHE.asEuint256(amount);
        euint8[] memory encryptedChat = _encryptChat(chatMessage);
        
        payments[paymentCounter] = EncryptedPayment({
            sender: msg.sender,
            receiver: receiver,
            encryptedAmount: encryptedAmount,
            encryptedChatHistory: encryptedChat
        });
    }

    // Decrypt payment details
    function getPaymentDetails(uint256 paymentId) 
        public 
        view 
        returns (uint256, string memory) 
    {
        EncryptedPayment storage payment = payments[paymentId];
        require(
            msg.sender == payment.sender || msg.sender == payment.receiver,
            "Unauthorized: Only sender or receiver can access this"
        );

        uint256 amount = FHE.decrypt(payment.encryptedAmount);
        string memory chatMessage = _decryptChatMessage(payment.encryptedChatHistory);

        return (amount, chatMessage);
    }

    // Helper function to encrypt a chat message (string to euint8[])
    function _encryptChat(string memory chatMessage) 
        internal 
        pure 
        returns (euint8[] memory) 
    {
        bytes memory chatBytes = bytes(chatMessage);
        euint8[] memory encryptedChat = new euint8[](chatBytes.length);

        for (uint256 i = 0; i < chatBytes.length; i++) {
            encryptedChat[i] = FHE.asEuint8(uint8(chatBytes[i]));
        }
        return encryptedChat;
    }

    // Helper function to decrypt chat messages
    function _decryptChatMessage(euint8[] memory encryptedMessage) 
    pure  
    internal  
    returns (string memory) 
    {
        bytes memory decryptedMessage = new bytes(encryptedMessage.length);

        for (uint256 i = 0; i < encryptedMessage.length; i++) {
            decryptedMessage[i] = bytes1(FHE.decrypt(encryptedMessage[i]));
        }

        return string(decryptedMessage);
    }

    // Receive Ether fallback
    receive() external payable {}

    fallback() external payable {}
}
