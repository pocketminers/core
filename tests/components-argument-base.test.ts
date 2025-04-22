import { PocketArgument } from "@components/base/argument";


describe("PocketArgument", () => {
    it("should create an instance with name and value", () => {
        const name = "testName";
        const value = "testValue";
        const argument = PocketArgument.from(name, value);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    });

    it("should create an instance from JSON", () => {
        const json = JSON.stringify({
            name: "testName",
            value: "testValue"
        });
        const argument = PocketArgument.fromJSON(json);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe("testName");
        expect(argument.value).toBe("testValue");
    });

    it("should convert to JSON", () => {
        const name = "testName";
        const value = "testValue";
        const argument = PocketArgument.from(name, value);
        const json = argument.toJSON();
        expect(json).toBe(JSON.stringify({
            name,
            value
        }));
    });

    it("should convert to string", () => {
        const name = "testName";
        const value = "testValue";
        const argument = PocketArgument.from(name, value);
        const str = argument.toString();
        expect(str).toBe(`${name}: ${value}`);
    });

    it("should convert to object", () => {
        const name = "testName";
        const value = "testValue";
        const argument = PocketArgument.from(name, value);
        const obj = argument.toObject();
        expect(obj).toEqual({
            name,
            value
        });
    });

    it("should convert to record", () => {
        const name = "testName";
        const value = "testValue";
        const argument = PocketArgument.from(name, value);
        const record = argument.toRecord();
        expect(record).toEqual({
            [name]: value
        });
    });

    it("should convert to key-value pair", () => {
        const name = "testName";
        const value = "testValue";
        const argument = PocketArgument.from(name, value);
        const keyValuePair = argument.toKeyValuePair();
        expect(keyValuePair).toEqual([name, value]);
    });

    it("should throw an error if name is not provided", () => {
        expect(() => {
            PocketArgument.from("", "testValue");
        }).toThrow("Name is required");
    });

    it("should throw an error if value is not provided", () => {
        expect(() => {
            PocketArgument.from("testName", undefined);
        }).toThrow("Value is required");
    });

    it("should throw an error if JSON is invalid", () => {
        const invalidJson = "{ name: 'testName', value: 'testValue' }";
        expect(() => {
            PocketArgument.fromJSON(invalidJson);
        }).toThrow("Invalid JSON string");
    });

    it("should throw an error if string is invalid", () => {
        const invalidString = "testName: testValue";
        expect(() => {
            PocketArgument.fromString(invalidString);
        }).toThrow("Invalid string format for deserialization");
    });

    it("should throw an error if string is empty", () => {
        expect(() => {
            PocketArgument.fromString("");
        }).toThrow("String is required");
    });

    it("should throw an error if string does not contain a key-value pair", () => {
        const invalidString = "testName";
        expect(() => {
            PocketArgument.fromString(invalidString);
        }).toThrow("Invalid string format for deserialization");
    });

    it("should throw an error if string does not contain a value", () => {
        const invalidString = "testName: ";
        expect(() => {
            PocketArgument.fromString(invalidString);
        }).toThrow("Invalid string format for deserialization");
    });
});