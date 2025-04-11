import { Parameter } from "@components/config/parameter";

describe("Parameter", () => {
    it("should create a Parameter instance with the correct properties", () => {
        const parameter = new Parameter({
            name: "testKey",
            description: "Test description",
            default: "defaultValue",
            required: true,
            optional: ["optionalValue1", "optionalValue2"],
        });

        expect(parameter.name).toBe("testKey");
        expect(parameter.description).toBe("Test description");
        expect(parameter.default).toBe("defaultValue");
        expect(parameter.required).toBe(true);
        expect(parameter.optional).toEqual(["optionalValue1", "optionalValue2"]);
    });
});