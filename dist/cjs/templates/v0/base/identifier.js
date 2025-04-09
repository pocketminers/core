"use strict";
/**
 * file: identifier.ts
 * description: This file contains the definition of the BaseIdentifier type and its associated types.
 * It is used to represent various types of identifiers that can be used in the Pocket Network.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseIdentifierTypes = void 0;
/**
 * IdentifierType is an enumeration of various types of identifiers
 * that can be used in the Pocket Network. These identifiers include
 * common formats like UUIDs, hashes, and decentralized identifiers.
 */
var BaseIdentifierTypes;
(function (BaseIdentifierTypes) {
    /**
     * A human-readable name used as an identifier.
     */
    BaseIdentifierTypes["Name"] = "Name";
    /**
     * A numerical identifier.
     */
    BaseIdentifierTypes["Number"] = "Number";
    /**
     * A symbol used as an identifier.
     */
    BaseIdentifierTypes["Symbol"] = "Symbol";
    /**
     * A Universally Unique Identifier (UUID), a 128-bit identifier.
     * Example: `550e8400-e29b-41d4-a716-446655440000`
     */
    BaseIdentifierTypes["UUID"] = "UUID";
    /**
     * A cryptographic hash used as an identifier.
     * Example: `sha256:9b74c9897bac770ffc029102a200c5de`
     */
    BaseIdentifierTypes["Hash"] = "Hash";
    /**
     * A Content Identifier (CID) used in decentralized systems like IPFS.
     * Example: `bafybeigdyrzt4j2z7z5z2j5z5z2j5z5z2j5z5z2j5z5z2j5z5z2j5z5z2j5`
     */
    BaseIdentifierTypes["CID"] = "CID";
    /**
     * A self-describing hash that includes the hash function and length.
     * Example: `1220b6e2b8c6d8e8f8e8f8e8f8e8f8e8f8e8f8e8f8e8f8e8f8e8f8e8f8e8f8`
     */
    BaseIdentifierTypes["Multihash"] = "Multihash";
    /**
     * A self-describing base encoding for data.
     * Example: `zHelloWorld` (Base58 encoded)
     */
    BaseIdentifierTypes["Multibase"] = "Multibase";
    /**
     * A Decentralized Identifier (DID) used in identity systems.
     * Example: `did:example:123456789abcdefghi`
     */
    BaseIdentifierTypes["DID"] = "DID";
    /**
     * A Uniform Resource Name (URN), a persistent, location-independent identifier.
     * Example: `urn:isbn:0451450523`
     */
    BaseIdentifierTypes["URN"] = "URN";
    /**
     * A unique identifier for accounts or contracts on a blockchain.
     * Example: `0x742d35cc6634c0532925a3b844bc454e4438f44e`
     */
    BaseIdentifierTypes["BlockchainAddress"] = "BlockchainAddress";
    /**
     * An IP address used to identify devices on a network.
     * Example: `192.168.1.1` (IPv4) or `2001:0db8:85a3:0000:0000:8a2e:0370:7334` (IPv6)
     */
    BaseIdentifierTypes["IPAddress"] = "IPAddress";
    /**
     * A Uniform Resource Locator (URL) used to locate resources on the internet.
     * Example: `https://example.com/resource`
     */
    BaseIdentifierTypes["URL"] = "URL";
    /**
     * A hash of a file's content, often used for integrity verification.
     * Example: `sha256:9b74c9897bac770ffc029102a200c5de`
     */
    BaseIdentifierTypes["FileHash"] = "FileHash";
    /**
     * An identifier encoded in Base64 for compact representation.
     * Example: `SGVsbG8gV29ybGQ=`
     */
    BaseIdentifierTypes["Base64"] = "Base64";
    /**
     * A cryptographic public key used for encryption or identity verification.
     * Example: `04bfcab2c3a1f4...`
     */
    BaseIdentifierTypes["PublicKey"] = "PublicKey";
    /**
     * A unique token used for authentication or authorization.
     * Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
     */
    BaseIdentifierTypes["Token"] = "Token";
    /**
     * Undefined identifier type, used for cases where the type is not specified.
     * Example: `undefined`
     */
    BaseIdentifierTypes["Undefined"] = "Undefined";
})(BaseIdentifierTypes || (exports.BaseIdentifierTypes = BaseIdentifierTypes = {}));
//# sourceMappingURL=identifier.js.map