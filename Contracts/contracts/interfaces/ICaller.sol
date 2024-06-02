// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface ICaller {
    event ResultProcessed(uint256 indexed requestId, string result);

    function processResult(uint256 _requestID, string memory result) external ;
}
