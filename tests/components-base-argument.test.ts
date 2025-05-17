import { PocketArgument } from "@components/base/argument";

describe("PocketArgument", () => {
    it("should throw an error if value is null", () => {
        try {
            const name = "testName";
            const value = null;
            // @ts-ignore
            new PocketArgument({ name, value });
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should throw an error if value is undefined", () => {
        try {
            const name = "testName";
            const value = undefined;
            // @ts-ignore
            new PocketArgument({ name, value });
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should throw an error if value is an empty string", () => {
        try {
            const name = "testName";
            const value = "";
            new PocketArgument({ name, value });
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should handle special characters in name and value", () => {
        const name = "test@Name#123";
        const value = "value$%^&*";
        const argument = new PocketArgument({ name, value });
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    });

    it("should handle numeric string as name", () => {
        const name = "12345";
        const value = "testValue";
        const argument = new PocketArgument({ name, value });
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    });

    it("should handle deeply nested JSON for fromJSON", () => {
        const json = JSON.stringify({
            name: "testName",
            value: { nestedKey: "nestedValue" }
        });
        const argument = PocketArgument.fromJSON(json);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe("testName");
        expect(argument.value).toEqual({ nestedKey: "nestedValue" });
    });

    it('should set the configuration to allowEmpty to false', () => {
        const name = "testName";
        const value = "testValue";
        const argument = new PocketArgument({ name, value, configuration: { allowEmpty: false }});
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    });

    it("should not throw an error if value is empty and allowEmpty is true", () => {
        const name = "testName";
        const value = "";
        const argument = new PocketArgument({ name, value, configuration: { allowEmpty: true }});
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    });

    it("should handle deeply nested object for toObject", () => {
        const name = "testName";
        const value = { nestedKey: "nestedValue" };
        const argument = new PocketArgument({ name, value });
        const obj = argument.toObject();
        expect(obj).toEqual({ name, value });
    });

    it("should handle special characters in string for fromString", () => {
        const str = "test@Name#123:value$%^&*";
        const argument = PocketArgument.fromString(str);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe("test@Name#123");
        expect(argument.value).toBe("value$%^&*");
    });

    it("should handle whitespace in string for fromString", () => {
        const str = "  testName  :  testValue  ";
        const argument = PocketArgument.fromString(str);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe("testName");
        expect(argument.value).toBe("testValue");
    });

    it("should handle empty object for toObject", () => {
        const name = "testName";
        const value = {};
        const argument = new PocketArgument({ name, value, configuration: { allowEmpty: true }});
        const obj = argument.toObject();
        expect(obj).toEqual({ name, value });
    });

    it("should handle empty record for toRecord", () => {
        const name = "testName";
        const value = {};
        const argument = new PocketArgument({ name, value, configuration: { allowEmpty: true }});
        const record = argument.toRecord();
        expect(record).toEqual({ [name]: value });
    });

    it("should throw an error if value is null for toKeyValuePair", () => {
        try {
            const name = "testName";
            const value = null;
            const argument = new PocketArgument({ name, value, configuration: { allowEmpty: false }});
            argument.toKeyValuePair();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should throw an error if value is undefined for toKeyValuePair", () => {
        try {
            const name = "testName";
            const value = undefined;
            // @ts-ignore
            const argument = new PocketArgument({ name, value });
            argument.toKeyValuePair();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should handle boolean values", () => {
        const name = "testName";
        const value = true;
        const argument = new PocketArgument({ name, value });
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    });

    it("should handle array values", () => {
        const name = "testName";
        const value = [1, 2, 3];
        const argument = new PocketArgument({ name, value });
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toEqual(value);
    });

    it("should handle object values", () => {
        const name = "testName";
        const value = { key: "value" };
        const argument = new PocketArgument({ name, value });
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toEqual(value);
    });

    it("should handle null values in fromRecord", () => {
        const record = { testName: null };
        try {
            PocketArgument.fromRecord(record);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should handle undefined values in fromRecord", () => {
        const record = { testName: undefined };
        try {
            PocketArgument.fromRecord(record);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should handle empty string values in fromRecord", () => {
        const record = { testName: "" };
        try {
            PocketArgument.fromRecord(record);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should handle empty string values in fromKeyValuePair", () => {
        const name = "testName";
        const value = "";
        try {
            PocketArgument.fromKeyValuePair([name, value]);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });

    it("should handle arguments with special characters in name and value", () => {
        const name = 123;
        const value = "value$%^&⭐️";
        const argument = new PocketArgument({ name, value });
        console.log(argument);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    })

    it('should handle arguments with special characters in name and value', () => {
        const name = "⭐️";
        const value = 123;
        const argument = new PocketArgument({ name, value });
        console.log(argument.toJSON());
        console.log(argument);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(name);
        expect(argument.value).toBe(value);
    })

    it('should create an argument from a JSON string', () => {
        const json = JSON.stringify({
            name: 234,
            value: "testValue"
        });
        const argument = PocketArgument.fromJSON(json);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe(234);
        expect(argument.value).toBe("testValue");
    });

    it('should create an argument from a string', () => {
        const str = "testName:testValue";
        const argument = PocketArgument.fromString(str);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe("testName");
        expect(argument.value).toBe("testValue");
    });

    it('should create an argument from a record', () => {
        const record = { testName: "testValue" };
        const argument = PocketArgument.fromRecord(record);
        expect(argument).toBeInstanceOf(PocketArgument);
        expect(argument.name).toBe("testName");
        expect(argument.value).toBe("testValue");
    });

    it("should get the hash of the argument", async () => {
        const name = "testName";
        const value = "testValue";
        const argument = new PocketArgument({ name, value });
        const hash = await argument.gethash({ keys: ["name", "value"] });
        console.log(argument.toJSON())
        console.log(hash);
        expect(hash).toBeDefined();
    });
    
    it("should handle empty string values in fromKeyValuePair", async () => {
        const name = "testName";
        const value = "";
        try {
            const arg = PocketArgument.fromKeyValuePair([name, value]);
            console.log(await arg.gethash({keys: ["name", "value"]}));
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the testName argument is required because allowEmpty is false");
        }
    });
});