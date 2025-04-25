import { SecretManager } from "@utilities/secret";

describe("SecretManager", () => {
    it("should return the correct environment for node", () => {
        const env = SecretManager.getEnvironment();
        expect(env).toBe("node");
    });

    it('should return a secret for a valid key', () => {
        const secret = SecretManager.getSecret('TEST_RESPONSE');
        expect(secret).toBe('Success');
    });
});
