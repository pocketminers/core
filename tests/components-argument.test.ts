import { Argument } from "@components/config/argument";
import { Metadata } from "@components/metadata";
import { BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { MultiHashUtilities } from "@utilities/multiHash";

describe("Argument", () => {
    const mockKey: BaseValueKey = 2;
    const mockValue: BaseValue<{[key:string]: string}> = { value: "mockValue" };

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

    it("should return a string representation of the argument", () => {
        const argument = new Argument({ name: mockKey, value: mockValue });

        expect(argument.toString()).toBe("2: {value: mockValue}");
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
        expect(identifier).toBeDefined();
        expect(identifier.type_).toBe(BaseIdentifierTypes.Multihash);
        expect(identifier.value).toEqual("0xc9cf365eb43aaabd2632b78401d968494edd9b8e206e318a815af0f1522ae16c")
    });

    it('should add a specified identifier to the argument', async () => {
        const argument = new Argument<{[key:string]: string}, BaseIdentifierTypes.Name>({ name: mockKey, value: mockValue, meta: new Metadata<BaseIdentifierTypes.Name, BaseObjectTypes.Argument>({
            id: {
                type_: BaseIdentifierTypes.Name,
                value: "mockId"
            }
        })});
        expect(argument.metadata.labels.id).toEqual({
            type_: BaseIdentifierTypes.Name,
            value: "mockId"
        });
        console.log(`argument.metadata.labels.id: ${String(argument.metadata.labels.id?.value)}`);
        expect(argument.metadata.labels.id?.type_).toBe(BaseIdentifierTypes.Name);

        const identifier = await argument.toHashedIdentifier();
        expect(identifier).toBeDefined();
        expect(identifier.type_).toBe(BaseIdentifierTypes.Multihash);
        expect(identifier.value).toEqual("0xc9cf365eb43aaabd2632b78401d968494edd9b8e206e318a815af0f1522ae16c");
    });

    it('should be able to have a number as the name', () => {
        const argument = new Argument({ name: 1, value: mockValue });
        expect(argument.name).toBe(1);
    });

    it('should be able to have a symbol as the name', () => {
        const argument = new Argument({ name: Symbol('⭐️'), value: mockValue });
        console.log(`argument.name: ${String(argument.name)}`);
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
        expect(argument.metadata.annotations.description).toBe("mock description");
        expect(argument.metadata.labels.tags).toEqual(["tag1", "tag2"]);
    });
});