import { BaseIdentifier, BaseIdentifierFormats } from "@templates/v0/base/identifier";
import { Checks } from "./checks";


/**
 * MultiHashAlgorithms is an enum that represents the different hashing algorithms
 */
enum MultiHashAlgorithms {
    /**
     * SHA-256 is a cryptographic hash function that produces a 256-bit hash value.
     */
    SHA256 = 'SHA-256',

    /**
     * SHA-512 is a cryptographic hash function that produces a 512-bit hash value.
     */

    SHA512 = 'SHA-512',

    // /**
    //  * SHA3-256 is a cryptographic hash function that produces a 256-bit hash value.
    //  * - It is part of the SHA-3 family of hash functions.
    //  * - It is designed to be more secure than SHA-2.
    //  * - It is used in various applications, including digital signatures and certificates.
    //  * - It is also used in blockchain technology for hashing transactions and blocks.
    //  */
    // SHA3_256 = 'SHA3-256',

    // /**
    //  * SHA3-512 is a cryptographic hash function, from the SHA-3 family, that produces a 512-bit hash value
    //  */
    // SHA3_512 = 'SHA3-512',

    // /** BROKEN - DOESN'T WORK IN SUBTLE CRYPTO
    //  * BLAKE2 is a cryptographic hash function that is faster than MD5, SHA-1, and SHA-2.
    //  * - It is designed to be more secure than MD5 and SHA-1.
    //  */
    //  RIPEMD160 = 'RIPEMD160'
}


type MultiHashAlgorithm = MultiHashAlgorithms.SHA256
    | MultiHashAlgorithms.SHA512
    // | MultiHashAlgorithms.SHA3_256
    // | MultiHashAlgorithms.SHA3_512
    // | MultiHashAlgorithms.RIPEMD160;

/**
 * MultiHashUtilities is a utility class that provides methods for hashing strings and generating multihashes.
 * - It uses the SubtleCrypto API for cryptographic operations.
 * - It provides methods for hashing strings, generating multihashes, and validating multihashes.
 * - It also provides methods for generating identifiers from multihashes.
 */
class MultiHashUtilities {
    public static async hashString(input: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    /**
     * Generates a multihash from a given string input.
     * The multihash is a hash of the input string, encoded in hexadecimal format.
     */
    public static async generateMultihash(input: string): Promise<string> {
        const hash = await this.hashString(input);
        return `0x${hash}`;
    }

    /**
     * Generates a multihash from a given string input and returns it as a Identifier.
     */
    public static async generateIdentifier(input: string): Promise<BaseIdentifier<BaseIdentifierFormats.Multihash>> {
        const hash = await this.generateMultihash(input);
        return {
            format: BaseIdentifierFormats.Multihash,
            value: hash
        }
    }

    public static isValidMultihash(input: string): boolean {
        const regex = /^0x[a-fA-F0-9]{64}$/;
        return regex.test(input);
    }

    public static async hashStringWithAlgorithm(input: string, algorithm: MultiHashAlgorithm): Promise<string> {
        if (Checks.isEmpty(input)) {
            throw new Error("Input string cannot be empty");
        }
        
        
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        return crypto.subtle.digest(algorithm, data)
            .then(hashBuffer => {
                return Array.from(new Uint8Array(hashBuffer))
                    .map(byte => byte.toString(16).padStart(2, '0'))
                    .join('');
            });
    }

}

export {
    type MultiHashAlgorithm,
    MultiHashAlgorithms,
    MultiHashUtilities
};


