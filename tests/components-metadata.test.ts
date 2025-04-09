import { Metadata } from "@components/metadata";
import { BaseIdentifierTypes } from "@templates/v0/base/identifier";

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
        expect(stringRepresentation).toContain('"type_":"string"');
        expect(stringRepresentation).toContain('"value":"test-id"');
    });
});

describe("Metadata: Updating", () => {
    it('should not update immutable properties', () => {
        const metadata = new Metadata({
            labels: {
                id: {
                    type_: BaseIdentifierTypes.Name,
                    value: "test-label-id"
                }
            }
        });

        try {
            // @ts-ignore
            metadata.labels.id.value = "new-value";
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should not update immutable timestamps', () => {
        const metadata = new Metadata({
            timestamps: {
                created: {date: new Date("2023-01-01T00:00:00Z")},
                updated: {date: new Date("2023-01-02T00:00:00Z")}
            }
        });

        try {
            // @ts-ignore
            metadata.timestamps.created = new Date("2023-01-03T00:00:00Z");
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should update mutable properties', () => {
        const metadata = new Metadata({
            annotations: {
                foo: "bar"
            }
        });

        const updatedMetadata = metadata.update({
            annotations: {
                foo: "new-bar",
                baz: "qux"
            }
        });

        expect(updatedMetadata.annotations.foo).toBe("new-bar");
        expect(updatedMetadata.annotations.baz).toBe("qux");
    });


    it('should have an updated timestamp', () => {
        const metadata = new Metadata({
            timestamps: {
                created: {date: new Date("2023-01-01T00:00:00Z")},
                updated: {date: new Date("2023-01-02T00:00:00Z")}
            }
        });

        const updatedMetadata = metadata.update({
            timestamps: {
                updated: {date: new Date()}
            }
        });

        expect(updatedMetadata.timestamps.updated?.date).not.toEqual(metadata.timestamps.updated?.date);
    });

});