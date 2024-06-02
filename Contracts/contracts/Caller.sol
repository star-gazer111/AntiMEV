// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./interfaces/IOracle.sol";

contract Caller {

    uint256 public requestID;
    IOracle oracle;
    address public oracleAddress;

    mapping(uint256 => string) public results;

    event ResultProcessed(uint256 indexed requestId, string result);
    event DataRequested(uint256 indexed requestId, uint256 blocknumber, bytes32 inputData);

    constructor(address OracleAddress) {
        requestID = 0;
        oracleAddress = OracleAddress;
        oracle = IOracle(OracleAddress);
    }

    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        _;
    }

    function requestResult(uint256 blockNumber, bytes32 transactionData) external  {
        requestID += 1;
        oracle.requestResult(requestID, blockNumber, transactionData);
        emit DataRequested(requestID, blockNumber, transactionData);
    }

    function processResult(uint256 _requestID, string memory result) external onlyOracle  {
        results[_requestID] = result;
        emit ResultProcessed(_requestID, result);
    }

    function getResult(uint256 _requestID) public view returns (string memory result) {
        return results[_requestID];
    }


}