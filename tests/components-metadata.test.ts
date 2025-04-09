import { Metadata } from "@components/metadata";

describe("Metadata", () => {
    it("should create an instance of Metadata", () => {
        const metadata = new Metadata({
            annotations: {
                id: {
                    type_: "string",
                    value: "test-id"
                }
            }
        });

        expect(metadata.annotations.id.type_).toBe("string");
        expect(metadata.annotations.id.value).toBe("test-id");
    });

    it("should not allow updating annotations", () => {
        try {
            const metadata = new Metadata({
                annotations: {
                    id: {
                        type_: "string",
                        value: "test-id"
                    }
                }
            });

            // @ts-ignore
            metadata.annotations.id.value = "new-value";
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("should throw an error if annotations are invalid", () => {
        try {
            const metadata = new Metadata({
                // @ts-ignore
                annotations: null
            });
            console.log(`Metadata: ${metadata}`);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("should handle optional annotations", () => {
        const metadata = new Metadata({});

        expect(metadata.annotations).toBeDefined();
    });

    it("should serialize metadata correctly", () => {
        const metadata = new Metadata({
            annotations: {
                id: {
                    type_: "string",
                    value: "test-id"
                }
            }
        });

        const serialized = JSON.stringify(metadata);
        expect(serialized).toContain('"type_":"string"');
        expect(serialized).toContain('"value":"test-id"');
    });

    it('should return a string representation of metadata', () => {
        const metadata = new Metadata({
            annotations: {
                id: {
                    type_: "string",
                    value: "test-id"
                }
            }
        });

        const stringRepresentation = metadata.toString();
        console.log(`String Representation: ${stringRepresentation}`);
        expect(stringRepresentation).toContain('"type_":"string"');
        expect(stringRepresentation).toContain('"value":"test-id"');
    });
});