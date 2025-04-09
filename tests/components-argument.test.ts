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
        const metadata = new Metadata({
            description: "mock description",
            tags: ["tag1", "tag2"]
        });
        expect(argument.metadata).toEqual(metadata);
    });

    it('should generate a unique identifier for the argument', async () => {
        const argument = new Argument({ name: mockKey, value: mockValue });
        const identifier = await argument.toHashedIdentifier();
        expect(identifier).toBeDefined();
        expect(identifier.type_).toBe(BaseIdentifierTypes.Multihash);
        expect(identifier.value).toEqual("0xc9cf365eb43aaabd2632b78401d968494edd9b8e206e318a815af0f1522ae16c")
    });
});