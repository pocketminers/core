import { Parameter } from "@components/config/parameter";2
import { BaseIdentifierTypes, BaseObjectTypes } from "@templates/v0";
import { Metadata } from "@components/metadata";
import { BaseParameter } from "@templates/v0/base/configuration";
import { MultiHashUtilities } from "@utilities/multiHash";

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

    it("should throw an error if name is not provided", () => {
        try {
            new Parameter({
            // @ts-ignore
            name: undefined,
            description: "Test description",
            default: "defaultValue",
            required: true,
            optional: ["optionalValue1", "optionalValue2"],
            });
        } catch (error) {
            expect(error).toEqual(new Error("Name is required"));
        }
    });

    it("should create a Parameter instance with default metadata if not provided", () => {
        const parameter = new Parameter({
            name: "testKey",
            description: "Test description",
            default: "defaultValue",
            required: true,
            optional: ["optionalValue1", "optionalValue2"],
        });

        expect(parameter.metadata).toBeDefined();
    });

    it("should create a Parameter instance with custom metadata if provided", async () => {
        const parameterData: BaseParameter<string, BaseIdentifierTypes.Undefined> = {
            data: { 
                name: "testKey",
                description: "Test description",
                default: "defaultValue",
                required: true,
                optional: ["optionalValue1", "optionalValue2"],
            }
        }
        
        const customMetadata: Metadata<BaseIdentifierTypes.Multihash, BaseObjectTypes.Parameter> = new Metadata<BaseIdentifierTypes.Multihash, BaseObjectTypes.Parameter>({
            id: await MultiHashUtilities.generateIdentifier(JSON.stringify(parameterData.data)),
            type: BaseObjectTypes.Parameter,
            tags: ["tag1", "tag2"],
            description: "Custom metadata description"
        });

        const parameter = new Parameter({
            name: "testKey",
            description: "Test description",
            default: "defaultValue",
            required: true,
            optional: ["optionalValue1", "optionalValue2"],
            meta: customMetadata,
        });
        expect(parameter.metadata).toBeDefined();
        expect(parameter.metadata.id).toEqual(customMetadata.id);
        expect(parameter.metadata.type).toEqual(customMetadata.type);
        expect(parameter.metadata).toEqual(customMetadata);
    });

    it("should return the correct string representation", () => {
        const parameter = new Parameter({
            name: "testKey",
            description: "Test description",
            default: "defaultValue",
            required: true,
            optional: ["optionalValue1", "optionalValue2"],
        });
        console.log(`metadata: ${parameter.metadataString}`);

        expect(parameter.metadata.type).toBe('Parameter');

        expect(parameter.toString()).toBe("{\"name\":\"testKey\",\"description\":\"Test description\",\"default\":\"defaultValue\",\"required\":true,\"optional\":[\"optionalValue1\",\"optionalValue2\"]}");
    });
});