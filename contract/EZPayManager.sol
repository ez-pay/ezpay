// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
 * @title EZPayManager
 * @dev Manages a list of wallet addresses owned by each user.
 */
contract EZPayManager {
    // Store the list of addresses owned by a user
    mapping(address => address[]) private userWallets;

    event WalletAdded(address wallet);
    event WalletRemoved(address wallet);

    /** 
     *  @dev Empty Constructor to initialize EZPayManager Contract
     */
    constructor(){}

    /**
     * @dev Adds a new wallet address to the caller's list.
     * @param wallet The address to be added.
     * @notice If the wallet already exists, the function will not add a duplicate.
     * @custom:gas-intensive This function may be gas-intensive for users with many wallets.
     */
    function addWallet(address wallet) public {
        // Check if the wallet already exists
        if (!isWallet(wallet)) {
            userWallets[msg.sender].push(wallet);
            emit WalletAdded(wallet);
        }
    }

    /**
     * @dev Remove a wallet from the caller's list of wallets.
     * @param wallet The address to be removed.
     * @return A boolean stating the whether the wallet has been successfully found and removed.
     */
    function removeWallet(address wallet) public returns(bool){
        uint256 length = userWallets[msg.sender].length;
        for (uint256 i = 0; i < length; i++) {
            if (userWallets[msg.sender][i] == wallet) {
                // Move the last element to the position of the element to be removed
                userWallets[msg.sender][i] = userWallets[msg.sender][length - 1];
                // Remove the last element
                userWallets[msg.sender].pop();
                emit WalletRemoved(wallet);
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Fetch all the wallets added by the user in the list
     * @return A list of wallets owned by the caller
     */
    function getWallet() public view returns (address[] memory){
        return userWallets[msg.sender];
    }
    
    /**
     * @dev Check if a wallet is in the user's list of wallets
     * @param wallet The address to be checked.
     * @return A boolean stating the whether the wallet is inside the user's walet list
     */
    function isWallet(address wallet) public view returns (bool) {
        if(wallet == msg.sender){
            return true;
        }
        uint256 length = userWallets[msg.sender].length;
        for (uint256 i = 0; i < length; i++) {
            if (userWallets[msg.sender][i] == wallet) {
                return true;
            }
        }
        // Wallet Address is not found in the list of wallets
        return false;
    }
}