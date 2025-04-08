import { BaseArgument } from "@components/base/argument";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";

describe("BaseArgument", () => {
    const mockKey: BaseValueKey = 2;
    const mockValue: BaseValue<{[key:string]: string}> = { value: "mockValue" };

    it("should create an instance with the correct properties", () => {
        const argument = new BaseArgument({ name: mockKey, value: mockValue });

        expect(argument.name).toBe(mockKey);
        expect(argument.value).toBe(mockValue);
    });

    it("should freeze the instance and its properties", () => {
        const argument = new BaseArgument({ name: mockKey, value: mockValue });

        expect(Object.isFrozen(argument)).toBe(true);
        expect(Object.isFrozen(argument.name)).toBe(true);
        expect(Object.isFrozen(argument.value)).toBe(true);
    });

    it("should return a string representation of the argument", () => {
        const argument = new BaseArgument({ name: mockKey, value: mockValue });

        expect(argument.toString()).toBe("'2':{value: 'mockValue'}");
    });

    it("should return a key-value pair array", () => {
        const argument = new BaseArgument({ name: mockKey, value: mockValue });

        expect(argument.toKeyValuePair()).toEqual([[mockKey, mockValue]]);
    });

    it("should return a record representation of the argument", () => {
        const argument = new BaseArgument({ name: mockKey, value: mockValue });

        expect(argument.toRecord()).toEqual({ mockKey: mockValue });
    });
});