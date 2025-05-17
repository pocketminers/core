import { BaseIdentifier, BaseIdentifierFormats } from "../templates/v0/base/identifier.js";
/**
 * MultiHashAlgorithms is an enum that represents the different hashing algorithms
 */
declare enum MultiHashAlgorithms {
    /**
     * SHA-256 is a cryptographic hash function that produces a 256-bit hash value.
     */
    SHA256 = "SHA-256",
    /**
     * SHA-512 is a cryptographic hash function that produces a 512-bit hash value.
     */
    SHA512 = "SHA-512"
}
type MultiHashAlgorithm = MultiHashAlgorithms.SHA256 | MultiHashAlgorithms.SHA512;
/**
 * MultiHashUtilities is a utility class that provides methods for hashing strings and generating multihashes.
 * - It uses the SubtleCrypto API for cryptographic operations.
 * - It provides methods for hashing strings, generating multihashes, and validating multihashes.
 * - It also provides methods for generating identifiers from multihashes.
 */
declare class MultiHashUtilities {
    static hashString(input: string): Promise<string>;
    /**
     * Generates a multihash from a given string input.
     * The multihash is a hash of the input string, encoded in hexadecimal format.
     */
    static generateMultihash(input: string): Promise<string>;
    /**
     * Generates a multihash from a given string input and returns it as a Identifier.
     */
    static generateIdentifier(input: string): Promise<BaseIdentifier<BaseIdentifierFormats.Multihash>>;
    static isValidMultihash(input: string): boolean;
    static hashStringWithAlgorithm(input: string, algorithm: MultiHashAlgorithm): Promise<string>;
}
export { type MultiHashAlgorithm, MultiHashAlgorithms, MultiHashUtilities };
//# sourceMappingURL=multiHash.d.ts.map