pragma solidity ^0.5.0;

contract Storage {
    uint id  = 1;
    struct Multihash {
        bytes32 digest;
        uint8 hashFunction;
        uint8 size;
        bytes32 name;
    }
    mapping (uint => Multihash) private ipfsHashes;

    /**
     * @dev associate a id with the multihash entry
     * @param _digest hash digest produced by hashing content using hash function
     * @param _hashFunction hashFunction code for the hash function used
     * @param _size length of the digest
     * @param _name name of the content uploaded
    */
    function addFile(bytes32 _digest, uint8 _hashFunction, uint8 _size, bytes32 _name) external {
        Multihash memory entry = Multihash(_digest, _hashFunction, _size, _name);
        ipfsHashes[id] = entry;
        id = id + 1;
    }

    /**
     * @dev retrieve multihash entry associated with an id
     * @param _id address used as key
    */
    function getEntry(uint _id) public view returns (bytes32 digest, uint8 hashfunction, uint8 size, bytes32 name) {
        Multihash storage entry = ipfsHashes[_id];
        return (entry.digest, entry.hashFunction, entry.size, entry.name);
    }

    /**
     * @dev retrieve total number of entries
    */
    function getCount() public view returns (uint) {
        return id;
    }
}