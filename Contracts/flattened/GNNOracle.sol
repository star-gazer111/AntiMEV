// Sources flattened with hardhat v2.22.4 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/utils/Context.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.4) (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File contracts/interfaces/ICaller.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.25;

interface ICaller {
    event ResultProcessed(uint256 indexed requestId, string result);

    function processResult(uint256 _requestID, string memory result) external ;
}


// File contracts/Oracle.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.25;


contract Oracle is Ownable{
    string private URL = "";
    mapping(address => bool) public whitelist;
    mapping(uint256 => bool) public requestIds;
    mapping(uint256 => address) public callbackAddress;

    event DataInput(uint256 indexed requestId, uint256 blockNumber, bytes32 inputData, string url);
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
    
    function setURL(string memory url) external onlyOwner {
        URL = url;
    }

    function requestResult(uint256 requestId,  uint256 blockNumber, bytes32 inputData) external  {
        require(!requestIds[requestId], "Result already requested");
        callbackAddress[requestId] = msg.sender;
        emit DataInput(requestId, blockNumber, inputData, URL);
    }
    
    function sendResult(uint256 requestId, string memory result) external onlyWhitelisted() {
        require(!requestIds[requestId], "Result already sent");
        requestIds[requestId] = true;
        require(callbackAddress[requestId] != address(0), "Invalid address");
        ICaller(callbackAddress[requestId]).processResult(requestId, result);
        emit ResultProcessed(requestId, result);
    }

}
