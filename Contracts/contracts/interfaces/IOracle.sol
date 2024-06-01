// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IOracle {
    function sendResult(uint256 _requestID, string memory result) external view returns (uint8);

    function requestResult(uint256 requestId, uint256 blockNumber, bytes32  inputData, string memory url) external;
}