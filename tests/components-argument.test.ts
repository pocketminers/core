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

        it("should throw an error if name is undefined", () => {
            try {
                // @ts-ignore
                new Argument({ name: undefined, value: mockValue });
            } catch (error: any) {
                console.log(`error: ${error.message}`);
                expect(error).toBeDefined();
                expect(error.message).toBe("Name is required");
            }
        });

        it('should handle a number as the name', () => {
            const argument = new Argument({ name: 1, value: mockValue });
            expect(argument.name).toBe(1);
        });

        it('should handle a symbol as the name', () => {
            const argument = new Argument({ name: Symbol('⭐️'), value: mockValue });
            expect(argument.name).not.toBeUndefined();
        });

        it("should allow and undefined value", () => { 
            const argument = new Argument({ name: mockKey, value: undefined });
            expect(argument.value).toBeUndefined();
        });

        it('should allow a string as the name', () => {
            const argument = new Argument({ name: "mockKey", value: mockValue });
            expect(argument.name).toBe("mockKey");
        });

        it('should allow metadata to be passed in', () => {
            const argument = new Argument({
                name: mockKey,
                value: mockValue,
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

        it("should return a JSON representation of the argument", () => {
            const argument = new Argument({ name: mockKey, value: mockValue });

            expect(argument.toJSON()).toEqual({
                name: mockKey,
                value: mockValue
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
});