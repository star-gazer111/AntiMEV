// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./interfaces/IOracle.sol";

/// @title Caller Contract
/// @notice This contract interacts with an Oracle to request and process results
/// @dev This contract uses an external Oracle interface for requesting and receiving results
contract Caller {

    /// @notice The current request ID
    uint256 public requestID;
    
    /// @notice The Oracle interface instance
    IOracle oracle;
    
    /// @notice The URL to be used in Oracle requests
    string public url = "";

    /// @notice A mapping to store results of requests by their ID
    mapping(uint256 => uint8) public results;

    /// @notice Emitted when a result is processed
    /// @param requestId The ID of the request
    /// @param result The result obtained from the Oracle
    event ResultProcessed(uint256 indexed requestId, uint8 result);

    /// @notice Emitted when data is requested from the Oracle
    /// @param requestId The ID of the request
    /// @param inputData The input data sent to the Oracle
    event DataRequested(uint256 indexed requestId, string inputData);

    /// @notice Constructor to initialize the Caller contract with an Oracle address
    /// @param OracleAddress The address of the Oracle contract
    constructor(address OracleAddress) {
        requestID = 0;
        oracle = IOracle(OracleAddress);
    }

    /// @notice Request a result from the Oracle
    /// @param transactionData The transaction data to be sent to the Oracle
    /// @return The ID of the request
    function requestResult(bytes32 transactionData) public returns (uint256) {
        requestID += 1;
        oracle.requestResult(requestID, transactionData, url);
        emit DataRequested(requestID, string(abi.encodePacked(transactionData)));
        return requestID;
    }

    /// @notice Process the result received from the Oracle
    /// @param _requestID The ID of the request
    /// @param result The result received from the Oracle
    /// @return The result that was processed
    function processResult(uint256 _requestID, uint8 result) public returns (uint8) {
        results[_requestID] = result;
        emit ResultProcessed(_requestID, result);
        return result;
    }

    /// @notice Set the URL to be used in Oracle requests
    /// @param _url The new URL to be set
    function setUrl(string memory _url) public {
        url = _url;
    }
}
