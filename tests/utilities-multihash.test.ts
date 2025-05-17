import { MultiHashAlgorithms, MultiHashUtilities } from "../src/utilities/multiHash";

describe("MultiHashUtilities", () => {
    describe("hashString", () => {
        it("should generate a SHA-256 hash for a given string", async () => {
            const input = "test-string";
            const hash = await MultiHashUtilities.hashString(input);

            expect(hash).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hash is 64 hex characters
        });

        it("should generate different hashes for different inputs", async () => {
            const input1 = "test-string-1";
            const input2 = "test-string-2";

            const hash1 = await MultiHashUtilities.hashString(input1);
            const hash2 = await MultiHashUtilities.hashString(input2);

            expect(hash1).not.toEqual(hash2);
        });
    });

    describe("generateMultihash", () => {
        it("should generate a multihash prefixed with '0x'", async () => {
            const input = "test-string";
            const multihash = await MultiHashUtilities.generateMultihash(input);

            expect(multihash).toMatch(/^0x[a-f0-9]{64}$/); // Multihash starts with '0x' and is 64 hex characters
        });

        it("should generate consistent multihashes for the same input", async () => {
            const input = "test-string";

            const multihash1 = await MultiHashUtilities.generateMultihash(input);
            const multihash2 = await MultiHashUtilities.generateMultihash(input);

            expect(multihash1).toEqual(multihash2);
        });
    });

    describe("generateIdentifier", () => {
        it("should generate an identifier with type 'Multihash' and a valid value", async () => {
            const input = "test-string";
            const identifier = await MultiHashUtilities.generateIdentifier(input);

            expect(identifier.format).toBe("Multihash");
            expect(identifier.value).toMatch(/^0x[a-f0-9]{64}$/); // Identifier value is a valid multihash
        });

        it("should generate different identifiers for different inputs", async () => {
            const input1 = "test-string-1";
            const input2 = "test-string-2";

            const identifier1 = await MultiHashUtilities.generateIdentifier(input1);
            const identifier2 = await MultiHashUtilities.generateIdentifier(input2);

            expect(identifier1.value).not.toEqual(identifier2.value);
        });
    });

    describe("isValidMultihash", () => {
        it("should return true for valid multihashes", () => {
            const validMultihash = "0x" + "a".repeat(64);
            expect(MultiHashUtilities.isValidMultihash(validMultihash)).toBe(true);
        });

        it("should return false for invalid multihashes", () => {
            const invalidMultihash = "invalid-multihash";
            expect(MultiHashUtilities.isValidMultihash(invalidMultihash)).toBe(false);
        });
    });

    describe("hashStringWithAlgorithm", () => {
        it("should generate a hash using the specified algorithm", async () => {
            const input = "test-string";
            const algorithm = MultiHashAlgorithms.SHA256; // Example algorithm

            const hash = await MultiHashUtilities.hashStringWithAlgorithm(input, algorithm);

            expect(hash).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hash is 64 hex characters
        });

        it("should generate different hashes for different algorithms", async () => {
            const input = "test-string";
            const algorithm1 = MultiHashAlgorithms.SHA256; // Example algorithm
            const algorithm2 = MultiHashAlgorithms.SHA512; // Different algorithm

            const hash1 = await MultiHashUtilities.hashStringWithAlgorithm(input, algorithm1);
            const hash2 = await MultiHashUtilities.hashStringWithAlgorithm(input, algorithm2);

            expect(hash1).not.toEqual(hash2);
        });

        it("should throw an error for unsupported algorithms", async () => {
            const input = "test-string";
            const unsupportedAlgorithm = "unsupported-algorithm"; // Example unsupported algorithm

            await expect(MultiHashUtilities.hashStringWithAlgorithm(input, unsupportedAlgorithm as MultiHashAlgorithms))
                .rejects
                .toThrow("Unrecognized algorithm name");
        });

        it("should throw an error for invalid input", async () => {
            const invalidInput = ""; // Example invalid input

            await expect(MultiHashUtilities.hashStringWithAlgorithm(invalidInput, MultiHashAlgorithms.SHA256))
                .rejects
                .toThrow("Input string cannot be empty");
        });

        it('should have the same hash for two identical inputs', async () => {
            const input = "test-string";
            const algorithm = MultiHashAlgorithms.SHA256;

            const hash1 = await MultiHashUtilities.hashStringWithAlgorithm(input, algorithm);
            const hash2 = await MultiHashUtilities.hashStringWithAlgorithm(input, algorithm);

            expect(hash1).toEqual(hash2);
        });
    });
});