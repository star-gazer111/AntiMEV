// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./interfaces/ICaller.sol";

/// @title Oracle Contract
/// @notice This contract serves as an Oracle for providing data to authorized callers

contract Oracle {

    /// @notice Mapping to track whitelisted addresses
    mapping(address => bool) public whitelist;
    
    /// @notice Mapping to track processed request IDs
    mapping(uint256 => bool) public requestIds;

    /// @notice Emitted when data is requested
    event DataRequested(uint256 indexed requestId, bytes32 inputData, string url);
    
    /// @notice Emitted when a result is processed
    event ResultProcessed(uint256 indexed requestId, uint8 result);
    
    /// @notice Constructor to initialize the Oracle with a list of allowed addresses
    /// @param allowedAddresses The addresses to be whitelisted
    constructor(address[] memory allowedAddresses) {
        for (uint256 i = 0; i < allowedAddresses.length; i++) {
            whitelist[allowedAddresses[i]] = true;
        }
    }
    
    /// @notice Modifier to restrict access to whitelisted addresses only
    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Caller is not whitelisted");
        _;
    }
    
    /// @notice Function to add an address to the whitelist
    /// @param _address The address to be added to the whitelist
    function addToWhitelist(address _address) external {
        whitelist[_address] = true;
    }
    
    /// @notice Function to remove an address from the whitelist
    /// @param _address The address to be removed from the whitelist
    function removeFromWhitelist(address _address) external {
        whitelist[_address] = false;
    }
    
    /// @notice Function for callers to request a result
    /// @param requestId The unique ID of the request
    /// @param inputData The input data associated with the request
    /// @param url The URL to fetch additional data if needed
    function requestResult(uint256 requestId, bytes32 inputData, string memory url) external onlyWhitelisted {
        emit DataRequested(requestId, inputData, url);
    }
    
    /// @notice Function for callers to send a result
    /// @param requestId The unique ID of the request
    /// @param result The result to be sent
    /// @return The result that was sent
    function sendResult(uint256 requestId, uint8 result) external returns (uint8) {
        require(!requestIds[requestId], "Result already sent");
        requestIds[requestId] = true;
        ICaller(msg.sender).processResult(requestId, result);
        emit ResultProcessed(requestId, result);
        return result;
    }

}
