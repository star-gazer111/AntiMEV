// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./interfaces/ICaller.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Oracle is Ownable{
    mapping(address => bool) public whitelist;
    mapping(uint256 => bool) public requestIds;
    mapping(uint256 => address) public callbackAddress;


    event DataRequested(uint256 indexed requestId, uint256 blockNumber, bytes32 inputData, string url);
    event ResultProcessed(uint256 indexed requestId, string result);
    
    constructor(address[] memory allowedAddresses) {
        for (uint256 i = 0; i < allowedAddresses.length; i++) {
            whitelist[allowedAddresses[i]] = true;
        }
    }
    
    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Caller is not whitelisted");
        _;
    }
    
    function addToWhitelist(address _address) external {
        whitelist[_address] = true;
    }
    
    function removeFromWhitelist(address _address) external {
        whitelist[_address] = false;
    }
    
    function requestResult(uint256 requestId,  uint256 blockNumber, bytes32 inputData, string memory url) external onlyWhitelisted {
        require(!requestIds[requestId], "Result already requested");
        callbackAddress[requestId] = msg.sender;
        emit DataRequested(requestId, blockNumber, inputData, url);
    }
    
    function sendResult(uint256 requestId, string memory result) external returns (uint8) {
        require(!requestIds[requestId], "Result already sent");
        requestIds[requestId] = true;
        ICaller(callbackAddress[requestId]).processResult(requestId, result);
        emit ResultProcessed(requestId, result);
    }

}
