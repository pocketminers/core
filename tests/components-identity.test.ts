import { PocketIdentity } from "@components/base/identity";

describe('PocketIdentity', () => {
    it('should create a PocketIdentity with valid type and value', () => {
        const type_ = "Name";
        const value = "exampleValue";

        const pocketIdentity = new PocketIdentity({ type_, value });

        expect(pocketIdentity.type_).toBe(type_);
        expect(pocketIdentity.value).toBe(value);
    });

    it('should throw an error if type_ is undefined', () => {
        const value = "exampleValue";

        expect(() => new PocketIdentity({ type_: undefined as any, value })).toThrow("Type is required");
    });

    it('should throw an error if value is undefined', () => {
        const type_ = "exampleType";

        // @ts-ignore
        try { new PocketIdentity({ type_, value: undefined as any }).toThrow("Value is required"); }
        catch (e: any) {
            expect(e.message).toBe("Value is required");
        }
    });
});