import { PocketConfiguration } from "@components/configuration";
import { PocketParameter } from "@components/parameter";
import { PocketArgument } from "@components/argument";

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

    it('should get required args', () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true });
        const param2 = new PocketParameter({ name: "param2", default: "default2", required: false });
        const config = new PocketConfiguration({params: [param1, param2]});
        const argRecords = config.preparedArgs({allowAdditionalArgs: true});
        expect(argRecords).toEqual([
            { param1: "default1" }
        ]);
    });

    it('should get optional args', () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true });
        const param2 = new PocketParameter({ name: "param2", default: "default2", required: false });
        const config = new PocketConfiguration({params: [param1, param2]});
        const argRecords = config.preparedArgs({allowNonRequired: true});
        expect(argRecords).toEqual([
            { param1: "default1" },
            { param2: "default2" }
        ]);
    });

    it('should throw an error if neither the param.default nor argument is available', () => {
        try {
            // @ts-ignore
            const param = new PocketParameter({
                name: "param1",
                required: true,
            });

            // @ts-ignore
            const arg = new PocketArgument({
                name: 'param2',
                value: 'value2',
            });

            const config = new PocketConfiguration({params: [param], args: [arg]});
            config.preparedArgs({allowAdditionalArgs: true});
        }
        catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Missing required parameters: param1");
        }
    });

    it('should throw allow additional args by default', () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true });
        const param2 = new PocketParameter({ name: "param2", default: "default2", required: false });
        const arg1 = new PocketArgument({ name: "arg1", value: "value1" });
        const arg2 = new PocketArgument({ name: "arg2", value: "value2" });
        const config = new PocketConfiguration({args: [arg1, arg2], params: [param1, param2]});
        const argRecords = config.preparedArgs({allowAdditionalArgs: true});
        expect(argRecords).toEqual([
            { param1: "default1" },
            { arg1: "value1" },
            { arg2: "value2" }
        ]);
    });

});