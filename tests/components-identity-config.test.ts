import { IdentityConfig } from "@components/identity/identity.config";

describe("IdentityConfig", () => {
    it("should have the correct properties", () => {
        expect(IdentityConfig.items).toBeDefined();
        expect(IdentityConfig.items.length).toBeGreaterThan(0);
        expect(IdentityConfig.items.length).toBe(8);
    });
});