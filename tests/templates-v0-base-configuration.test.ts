import { BaseArgument, BaseConfiguration, BaseParameter, BaseProperty } from "@templates/v0/base/configuration";
import { BaseIdentifierTypes } from "@templates/v0/base/identifier";


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
});