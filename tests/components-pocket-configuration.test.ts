import { PocketConfiguration } from "@components/configuration";
import { PocketParameter } from "@components/parameter";

describe("PocketConfiguration", () => {
    it("should create a PocketConfiguration instance", () => {
        const config = new PocketConfiguration();
        expect(config).toBeInstanceOf(PocketConfiguration);
    });

    it("should have arguments and parameters properties", () => {
        const config = new PocketConfiguration();
        expect(config.arguments).toEqual([]);
        expect(config.parameters).toEqual([]);
    });

    it("should return the key, if available", () => {
        const param = new PocketParameter({
            name: 'Test Parameter 1',
            key: '1',
            default: 'defaultValue',
            required: true,
        });

        expect(PocketConfiguration.getNameOrKey({ param })).toBe('1');
    });

    it('should return the name, if key is not available', () => {
        const param = new PocketParameter({
            name: 'Test Parameter 2',
            default: 'defaultValue',
            required: true,
        });

        expect(PocketConfiguration.getNameOrKey({ param })).toBe('Test Parameter 2');
    });

    it("should throw an error if neither key nor name is available", () => {
        try {
            // @ts-ignore
            const param = new PocketParameter({
                default: 'defaultValue',
                required: true,
            });
        }
        catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Name is required");
        }
    });

    it("should return required parameters", () => {
        const param1 = new PocketParameter({ name: "param1", required: true });
        const param2 = new PocketParameter({ name: "param2", required: false });
        const config = new PocketConfiguration({params: [param1, param2]});
        const requiredParams = PocketConfiguration.getRequiredParameters({ params: config.parameters });
        expect(requiredParams).toEqual([param1]);
    });

    it("should return optional parameters", () => {
        const param1 = new PocketParameter({ name: "param1", required: true });
        const param2 = new PocketParameter({ name: "param2", required: false });
        const config = new PocketConfiguration({params: [param1, param2]});
        const optionalParams = PocketConfiguration.getOptionalParameters({ params: config.parameters });
        expect(optionalParams).toEqual([param2]);
    });

    it("should return default required parameter values", () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true });
        const param2 = new PocketParameter({ name: "param2", default: "default2", required: false });
        const config = new PocketConfiguration({params: [param1, param2]});
        const defaultRequiredParams = PocketConfiguration.getDefaultRequiredParameterValues({ params: config.parameters });
        expect(defaultRequiredParams).toEqual([{name: "param1", value: "default1" }]);
    });
});