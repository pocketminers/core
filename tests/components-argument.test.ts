import { Argument } from "@components/config/argument";
import { Metadata } from "@components/metadata";
import { BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { MultiHashUtilities } from "@utilities/multiHash";

describe("Argument", () => {
    const mockKey: BaseValueKey = 2;
    const mockValue: BaseValue<{[key:string]: string}> = { value: "mockValue" };

    describe("Argument: constructor", () => {
        it("should create an instance with the correct properties", () => {
            const argument = new Argument({ name: mockKey, value: mockValue });

            expect(argument.name).toBe(mockKey);
            expect(argument.value).toBe(mockValue);
        });

        it("should freeze the instance and its properties", () => {
            const argument = new Argument({ name: mockKey, value: mockValue });

            expect(Object.isFrozen(argument)).toBe(true);
            expect(Object.isFrozen(argument.name)).toBe(true);
            expect(Object.isFrozen(argument.value)).toBe(true);
        });
    });

    describe("Argument: methods", () => {
        it("should return a string representation of the argument", () => {
            const name = 2;
            const value = { value: "mockValue" };
            const argument = new Argument({ name, value });

            expect(argument.toString()).toBe(`${String(mockKey)}: ${JSON.stringify(mockValue)}`);
        });

        it("should return a key-value pair array", () => {
            const argument = new Argument({ name: mockKey, value: mockValue });

            expect(argument.toKeyValuePair()).toEqual([[mockKey, mockValue]]);
        });

        it("should return a record representation of the argument", () => {
            const argument = new Argument({ name: mockKey, value: mockValue });

            expect(argument.toRecord()).toEqual({
                [mockKey]: mockValue
            });
        });

        it('should add metadata to the argument', () => {
            const argument = new Argument({ name: mockKey, value: mockValue, meta: new Metadata<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>({
                description: "mock description",
                tags: ["tag1", "tag2"]
            })});

            expect(argument.metadata).toBeDefined();
        });

        it('should generate a unique identifier for the argument', async () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const identifier = await argument.toHashedIdentifier();
            const hash = await MultiHashUtilities.generateIdentifier(argument.toString());
            console.log(`hash: ${JSON.stringify(hash)}`);
            expect(identifier).toBeDefined();
            expect(identifier.type_).toBe(BaseIdentifierTypes.Multihash);
            expect(identifier.value).toEqual("0x3d663145e99775edbe437ad4d28344b3008535a631fd035a35f717130e0380c7")
        });

        it('should add a specified identifier to the argument', async () => {
            const argument = new Argument<{[key:string]: string}, BaseIdentifierTypes.Name>({ name: mockKey, value: mockValue, meta: new Metadata<BaseIdentifierTypes.Name, BaseObjectTypes.Argument>({
                id: {
                    type_: BaseIdentifierTypes.Name,
                    value: "mockId"
                }
            })});
            expect(argument.metadata.labels?.id).toEqual({
                type_: BaseIdentifierTypes.Name,
                value: "mockId"
            });
            // console.log(`argument.metadata.labels.id: ${String(argument.metadata.labels.id?.value)}`);
            expect(argument.metadata.labels?.id?.type_).toBe(BaseIdentifierTypes.Name);

            const identifier = await argument.toHashedIdentifier();
            expect(identifier).toBeDefined();
            expect(identifier.type_).toBe(BaseIdentifierTypes.Multihash);
            expect(identifier.value).toEqual("0x3d663145e99775edbe437ad4d28344b3008535a631fd035a35f717130e0380c7");
        });

        it('should be able to have a number as the name', () => {
            const argument = new Argument({ name: 1, value: mockValue });
            expect(argument.name).toBe(1);
        });

        it('should be able to have a symbol as the name', () => {
            const argument = new Argument({ name: Symbol('⭐️'), value: mockValue });
            // console.log(`argument.name: ${String(argument.name)}`);
            expect(argument.name).not.toBeUndefined();
        });
    });


    describe("Argument: static methods", () => {
        it("should create an argument from a record", () => {
            const record: Record<BaseValueKey, BaseValue<{[key:string]: string}>> = {
                1: { value: "value1" }
            };

            const argument = Argument.fromRecord(record);

            expect(argument).toBeDefined();
            expect(argument.name).toBe("1");
            expect(argument.value).toEqual({ value: "value1" });
        });

        it("should throw an error if the record is empty", () => {
            const record: Record<BaseValueKey, BaseValue<{[key:string]: string}>> = {};

            try {
                Argument.fromRecord(record);
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Record is empty");
            }
        });

        it("should throw an error if the record is undefined", () => {
            try {
                // @ts-ignore
                Argument.fromRecord(undefined);
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
                Argument.fromRecord(record);
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

    describe("Argument: error handling", () => {
        it("should throw an error if the name is undefined", () => {
            try {
                // @ts-ignore
                new Argument({ name: undefined, value: mockValue });
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Name is required");
            }
        });

        it("should throw an error if the value is undefined", () => {
            try {
                // @ts-ignore
                new Argument({ name: mockKey, value: undefined });
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Value is required");
            }
        });
    });

    describe("Argument: serialization", () => {
        it("should serialize the argument to a JSON string", () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const jsonString = argument.toJsonString();

            expect(jsonString).toBe(JSON.stringify(argument.data))
        });

        it("should deserialize the argument from a JSON string", () => {
            const jsonString = `{"2": {"value": "mockValue"}}`;
            const argument = Argument.fromRecord(JSON.parse(jsonString));

            expect(argument.name).toBe(String(mockKey));
            expect(argument.value).toEqual(mockValue);
        });

        it("should throw an error if the JSON string is invalid", () => {
            const invalidJsonString = `{invalid: "json"}`;

            try {
                Argument.fromRecord(JSON.parse(invalidJsonString));
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Expected property name or '}' in JSON at position 1 (line 1 column 2)");
            }
        });

        it("should throw an error if the JSON string is empty", () => {
            const emptyJsonString = "";

            try {
                Argument.fromRecord(JSON.parse(emptyJsonString));
            } catch (error: any) {
                expect(error).toBeDefined();
                expect(error.message).toBe("Unexpected end of JSON input");
            }
        });

        it('should serialize and deserialize to String', () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const serialized = argument.toString();
            const deserialized = Argument.fromString<{[key:string]: string}>(serialized);
            console.log(`deserialized: ${JSON.stringify(deserialized)}`);
            expect(deserialized).toBeDefined();
        });

        it('should serialize and deserialize to KeyValuePair', () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const serialized = argument.toKeyValuePair();
            const deserialized = Argument.fromKeyValuePair(serialized[0]);
            console.log(`deserialized: ${JSON.stringify(deserialized)}`);
            expect(deserialized).toBeDefined();
        });

        it('should serialize and deserialize to Record', () => {
            const argument = new Argument({ name: mockKey, value: mockValue });
            const serialized = argument.toRecord();
            const deserialized = Argument.fromRecord(serialized);
            console.log(`deserialized: ${JSON.stringify(deserialized)}`);
            expect(deserialized).toBeDefined();
        });
    });
});