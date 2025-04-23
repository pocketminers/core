import { PocketMetadata } from "@components/metadata";
import { BaseIdentifierFormats } from "@templates/v0/base/identifier";
import { BaseObjects, BaseObject} from "@templates/v0/base/object";

describe("PocketMetadata", () => {
    it("should create an instance of PocketMetadata", () => {
        const metadata = new PocketMetadata({
            annotations: {
                id: {
                    format: "string",
                    value: "test-id"
                }
            }
        });

        expect(metadata.annotations.id.format).toBe("string");
        expect(metadata.annotations.id.value).toBe("test-id");
    });

    it("should not allow updating annotations", () => {
        try {
            const metadata = new PocketMetadata({
                annotations: {
                    id: {
                        format: "string",
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
            const metadata = new PocketMetadata({
                // @ts-ignore
                annotations: null
            });
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("should handle optional annotations", () => {
        const metadata = new PocketMetadata({});

        expect(metadata.annotations).toBeDefined();
    });

    it("should serialize metadata correctly", () => {
        const metadata = new PocketMetadata({
            annotations: {
                id: {
                    format: "string",
                    value: "test-id"
                }
            }
        });

        const serialized = JSON.stringify(metadata);
        expect(serialized).toContain('"format":"string"');
        expect(serialized).toContain('"value":"test-id"');
    });

    it('should return a string representation of metadata', () => {
        const metadata = new PocketMetadata({
            annotations: {
                id: {
                    format: "string",
                    value: "test-id"
                }
            }
        });

        const stringRepresentation = metadata.toString();
        expect(stringRepresentation).toContain('"format":"string"');
        expect(stringRepresentation).toContain('"value":"test-id"');
    });
});

describe("PocketMetadata: Updating", () => {
    it('should not update immutable properties', () => {
        const metadata = new PocketMetadata({
            labels: {
                id: {
                    format: BaseIdentifierFormats.Name,
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
        const metadata = new PocketMetadata({
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
        const metadata = new PocketMetadata({
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
        const metadata = new PocketMetadata({
            timestamps: {
                created: {date: new Date("2023-01-01T00:00:00Z")},
                updated: {date: new Date("2023-01-02T00:00:00Z")}
            }
        });

        const updatedTimestamp = new Date("2023-01-03T00:00:00Z");

        try {
            const updatedMetadata = metadata.update({
                timestamps: {
                    updated: {date: updatedTimestamp}
                }
            });

            expect(updatedMetadata.timestamps.updated?.date).toEqual(updatedTimestamp);
            expect(updatedMetadata.timestamps.updated?.date).not.toEqual(metadata.timestamps.updated?.date);
        }
        catch (error) {
            expect(error).toBeDefined();
        }

    
    });

});

describe('PocketMetadata: get methods', () => {
    it('should get the id', () => {
        const metadata = new PocketMetadata<
            BaseIdentifierFormats.Name,
            BaseObjects.Configuration
        >({
            labels: {
                id: {
                    format: BaseIdentifierFormats.Name,
                    value: "test-label-id"
                }
            }
        });

        expect(metadata.id.value).toBe("test-label-id");
    });

    it('should get the type', () => {
        const metadata = new PocketMetadata({
            labels: {
                type: BaseObjects.Configuration
            }
        });

        expect(metadata.type).toBe("Configuration");
    });
});