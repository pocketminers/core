import { BaseArgument, BaseConfiguration, BaseParameter, BaseParameterEntry, BaseProperty } from "@templates/v0/base/configuration";
import { BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { ParameterEntry } from "index";


describe("BaseArgument", () => {
    it("should create an instance of BaseArgument", () => {
        const argument: BaseArgument<string, BaseIdentifierTypes.Undefined> = {
            data: {
                name: "test",
                value: "value"
            }
        }

        expect(argument.data.name).toBe("test");
        expect(argument.data.value).toBe("value");
    });

    it("should accept a metadata object", () => {
        const argument: BaseArgument<string, BaseIdentifierTypes.Undefined> = {
            data: {
                name: "test",
                value: "value"
            },
            metadata: {
                annotations: {
                    id: {
                        type_: BaseIdentifierTypes.Undefined,
                        value: "undefined"
                    }
                }
            }
        }

        expect(argument.metadata?.annotations?.id.type_).toBe(BaseIdentifierTypes.Undefined);
        expect(argument.metadata?.annotations?.id.value).toBe("undefined");
    });

    it("should throw an error if name is not provided", () => {
        try {
            const argument: BaseArgument<string, BaseIdentifierTypes.Undefined> = {
                data: {
                    // @ts-ignore
                    name: undefined,
                    value: "value"
                }
            }
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });
});


describe("BaseParameter", () => {
    it("should create an instance of BaseParameter", () => {
        const parameterEntry: ParameterEntry<string, BaseIdentifierTypes.Undefined> = {
            name: "test",
            description: "description",
            default: "default",
            required: true,
            optional: ["optional"]
        }

        expect(parameterEntry.name).toBe("test");
        expect(parameterEntry.description).toBe("description");
        expect(parameterEntry.default).toBe("default");
        expect(parameterEntry.required).toBe(true);
        expect(parameterEntry.optional).toEqual(["optional"]);
    });

    it("should accept a metadata object", () => {
        const parameterEntry: BaseParameterEntry<string> = {
                name: "test",
                description: "description",
                default: "default",
                required: true,
                optional: ["optional"]
            }
        const metadata = {
            annotations: {
                id: {
                    type_: BaseIdentifierTypes.Undefined,
                    value: "undefined"
                }
            }
        }
        const parameterWithMetadata: BaseParameter<string, BaseIdentifierTypes.Undefined> = {
                data: {
                    name: parameterEntry.name,
                    description: parameterEntry.description,
                    default: parameterEntry.default,
                    required: parameterEntry.required,
                    optional: parameterEntry.optional
                },
                metadata
        }
        expect(parameterWithMetadata.data.name).toBe("test");
        expect(parameterWithMetadata.data.description).toBe("description");
        expect(parameterWithMetadata.data.default).toBe("default");
        expect(parameterWithMetadata.data.required).toBe(true);
        expect(parameterWithMetadata.data.optional).toEqual(["optional"]);
        expect(parameterWithMetadata.metadata?.annotations?.id.type_).toBe(BaseIdentifierTypes.Undefined);
        expect(parameterWithMetadata.metadata?.annotations?.id.value).toBe("undefined");
    });

    it("should throw an error if name is not provided", () => {
        try {
            
            const parameter: BaseParameter<string, BaseIdentifierTypes.Undefined> = {
                data: {
                    // @ts-ignore
                    name: undefined,
                    description: "description",
                    default: "default",
                    required: true,
                    optional: ["optional"]
                }
            }
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });
});


describe("BaseProperty", () => {
    it("should create an instance of BaseProperty", () => {
        const property: BaseProperty<string, BaseIdentifierTypes.Undefined> = {
            data: {
                name: "test",
                description: "description",
                value: "value",
                default: "default",
                required: true,
                optional: ["optional"]
            }
        }

        expect(property.data.name).toBe("test");
        expect(property.data.description).toBe("description");
        expect(property.data.value).toBe("value");
        expect(property.data.default).toBe("default");
        expect(property.data.required).toBe(true);
        expect(property.data.optional).toEqual(["optional"]);
    });

    it("should accept a metadata object", () => {
        const property: BaseProperty<string, BaseIdentifierTypes.Undefined> = {
            data: {
                name: "test",
                description: "description",
                value: "value",
                default: "default",
                required: true,
                optional: ["optional"]
            },
            metadata: {
                annotations: {
                    id: {
                        type_: BaseIdentifierTypes.Undefined,
                        value: "undefined"
                    }
                }
            }
        }

        expect(property.metadata?.annotations?.id.type_).toBe(BaseIdentifierTypes.Undefined);
        expect(property.metadata?.annotations?.id.value).toBe("undefined");
    });

    it("should throw an error if name is not provided", () => {
        try {
            
            const property: BaseProperty<string, BaseIdentifierTypes.Undefined> = {
                data: {
                    // @ts-ignore
                    name: undefined,
                    description: "description",
                    value: "value",
                    default: "default",
                    required: true,
                    optional: ["optional"]
                }
            }
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });
});


describe("BaseConfiguration", () => {
    it("should create an instance of BaseConfiguration", () => {
        const configuration: BaseConfiguration<string, BaseIdentifierTypes.Undefined> = {
            data: {arguments: [
            {
                data: {
                name: "test",
                value: "value"
                }
            }
            ],
            parameters: [
            {
                data: {
                name: "test",
                description: "description",
                default: "default",
                required: true,
                optional: ["optional"]
                }
            }
            ]}
        }

        expect(configuration.data.arguments[0].data.name).toBe("test");
        expect(configuration.data.arguments[0].data.value).toBe("value");
        expect(configuration.data.parameters[0].data.name).toBe("test");
        expect(configuration.data.parameters[0].data.description).toBe("description");
        expect(configuration.data.parameters[0].data.default).toBe("default");
        expect(configuration.data.parameters[0].data.required).toBe(true);
        expect(configuration.data.parameters[0].data.optional).toEqual(["optional"]);
    });

    it("should throw an error if name is not provided", () => {
        try {
            
            const configuration: BaseConfiguration<string, BaseIdentifierTypes.Undefined> = {
                data: {
                    // @ts-ignore
                    name: undefined,
                    description: "description",
                    value: "value",
                    default: "default",
                    required: true,
                    optional: ["optional"]
                }
            }
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });
});