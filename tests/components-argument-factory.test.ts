import { ArgumentFactory } from "@components/config/argument.factory";
import { Metadata } from "@components/metadata";
import { BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { MultiHashUtilities } from "@utilities/multiHash";
import { Argument } from "@components/config/argument";

describe("ArgumentFactory", () => {
    const mockKey: BaseValueKey = 2;
    const mockValue: BaseValue<{[key:string]: string}> = { value: "mockValue" };

    describe("ArgumentFactory: static methods", () => {
        it("should create an argument from a record", () => {
            const record: Record<BaseValueKey, BaseValue<{[key:string]: string}>> = {
                1: { value: "value1" }
            };

            const argument = ArgumentFactory.fromRecord(record);

            expect(argument).toBeDefined();
            expect(argument.name).toBe("1");
            expect(argument.value).toEqual({ value: "value1" });
        });

        it("should throw an error if the record is empty", () => {
            const record: Record<BaseValueKey, BaseValue<{[key:string]: string}>> = {};

            try {
                ArgumentFactory.fromRecord(record);
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Record is empty");
            }
        });

        it("should throw an error if the record is undefined", () => {
            try {
                // @ts-ignore
                ArgumentFactory.fromRecord(undefined);
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Record is required");
            }
        });

        it("should throw an error if the record has more than one key-value pair", () => {
            const record: Record<BaseValueKey, BaseValue<{[key:string]: string}>> = {
                1: { value: "value1" },
                2: { value: "value2" }
            };

            try {
                ArgumentFactory.fromRecord(record);
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Record must contain only one key-value pair");
            }
        });

        it('should include metadata in the argument', () => {
            const argument = new Argument({
                name: 'mockKey',
                value: 'mockValue',
                meta: new Metadata<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>({
                    description: "mock description",
                    tags: ["tag1", "tag2"]
                })
            });
            expect(argument.metadata).toBeDefined();
            expect(argument.metadata.annotations?.description).toBe("mock description");
            expect(argument.metadata.labels?.tags).toEqual(["tag1", "tag2"]);
        });
    });

    describe("ArgumentFactory: error handling", () => {
        it("should throw an error if the name is undefined", () => {
            try {
                // @ts-ignore
                new ArgumentFactory({ name: undefined, value: mockValue });
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Name is required");
            }
        });

        it("should throw an error if the value is undefined", () => {
            try {
                // @ts-ignore
                new ArgumentFactory({ name: mockKey, value: undefined });
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Value is required");
            }
        });
    });

    describe("ArgumentFactory: serialization", () => {
        it("should serialize the argument to a JSON string", () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const jsonString = argument.toJsonString();

            expect(jsonString).toBe(JSON.stringify(argument.data))
        });

        it("should deserialize the argument from a JSON string", () => {
            const jsonString = `{"2": {"value": "mockValue"}}`;
            const argument = ArgumentFactory.fromRecord(JSON.parse(jsonString));

            expect(argument.name).toBe(String(mockKey));
            expect(argument.value).toEqual(mockValue);
        });

        it("should throw an error if the JSON string is invalid", () => {
            const invalidJsonString = `{invalid: "json"}`;

            try {
                ArgumentFactory.fromRecord(JSON.parse(invalidJsonString));
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Expected property name or '}' in JSON at position 1 (line 1 column 2)");
            }
        });

        it("should throw an error if the JSON string is empty", () => {
            const emptyJsonString = "";

            try {
                ArgumentFactory.fromRecord(JSON.parse(emptyJsonString));
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Unexpected end of JSON input");
            }
        });

        it('should serialize and deserialize to String', () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const serialized = argument.toString();
            const deserialized = ArgumentFactory.fromString<{[key:string]: string}>(serialized);
            console.log(`deserialized: ${JSON.stringify(deserialized)}`);
            expect(deserialized).toBeDefined();
        });

        it('should serialize and deserialize to KeyValuePair', () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const serialized = argument.toKeyValuePair();
            const deserialized = ArgumentFactory.fromKeyValuePair(serialized[0]);
            console.log(`deserialized: ${JSON.stringify(deserialized)}`);
            expect(deserialized).toBeDefined();
        });

        it('should serialize and deserialize to Record', () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const serialized = argument.toRecord();
            const deserialized = ArgumentFactory.fromRecord(serialized);
            console.log(`deserialized: ${JSON.stringify(deserialized)}`);
            expect(deserialized).toBeDefined();
        });
    });
});