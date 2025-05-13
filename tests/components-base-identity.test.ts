import { PocketIdentity } from "@components/base/identity";

describe('PocketIdentity', () => {
    it('should create a PocketIdentity with valid type and value', () => {
        const format = "Name";
        const value = "exampleValue";

        const pocketIdentity = new PocketIdentity({ format, value });

        expect(pocketIdentity.format).toBe(format);
        expect(pocketIdentity.value).toBe(value);
    });

    it('should throw an error if format is undefined', () => {
        const value = "exampleValue";

        expect(() => new PocketIdentity({ format: undefined as any, value })).toThrow("Type is required");
    });

    it('should throw an error if value is undefined', () => {
        const format = "exampleType";

        // @ts-ignore
        try { new PocketIdentity({ format, value: undefined as any }).toThrow("Invalid identifier format: exampleType"); }
        catch (e: any) {
            expect(e.message).toBe("Invalid identifier format: exampleType");
        }
    });

    it('should throw an error if value is not in the correct format', () => {
        const format = "exampleType";
        const value = "invalidValue";

        // @ts-ignore
        try { new PocketIdentity({ format, value }); }
        catch (e: any) {
            expect(e.message).toBe("Invalid identifier format: exampleType");
        }
    });

    it('should create a PocketIdentity with a valid format and generate a value', () => {
        const format = "Name";

        const pocketIdentity = new PocketIdentity({ format });

        expect(pocketIdentity.format).toBe(format);
        expect(pocketIdentity.value).toMatch(/^[a-zA-Z0-9]{34}$/); // Adjust the regex based on the expected format
    });
});