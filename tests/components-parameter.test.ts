import { PocketParameter } from "@components/parameter";

describe("PocketParameter", () => {
    it('should create an instance with name and default value', () => {
        const name = "testName";
        const defaultValue = "testValue";
        const parameter = new PocketParameter({name, default: defaultValue});
        expect(parameter).toBeInstanceOf(PocketParameter);
        expect(parameter.name).toBe(name);
        expect(parameter.default).toBe(defaultValue);
    });

    it('should create an instance with name and required flag', () => {
        const name = "testName";
        const required = true;
        const parameter = new PocketParameter({name, required});
        expect(parameter).toBeInstanceOf(PocketParameter);
        expect(parameter.name).toBe(name);
        expect(parameter.required).toBe(required);
    });

    it('should create an instance with name and description', () => {
        const name = "testName";
        const description = "testDescription";
        const parameter = new PocketParameter({name, description});
        expect(parameter).toBeInstanceOf(PocketParameter);
        expect(parameter.name).toBe(name);
        expect(parameter.description).toBe(description);
    });

    it('should create an instance with name and options', () => {
        const name = "testName";
        const options = ["option1", "option2"];
        const parameter = new PocketParameter({name, options});
        expect(parameter).toBeInstanceOf(PocketParameter);
        expect(parameter.name).toBe(name);
        expect(parameter.options).toEqual(options);
    });

    it('should create an instance with name, description, default value, required flag, and options', () => {
        const name = "testName";
        const description = "testDescription";
        const defaultValue = "defaultValue";
        const required = true;
        const options = ["option1", "option2"];
        const parameter = new PocketParameter({name, description, default: defaultValue, required, options});
        expect(parameter).toBeInstanceOf(PocketParameter);
        expect(parameter.name).toBe(name);
        expect(parameter.description).toBe(description);
        expect(parameter.default).toBe(defaultValue);
        expect(parameter.required).toBe(required);
        expect(parameter.options).toEqual(options);
    });

});
