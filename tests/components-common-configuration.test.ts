import { PocketConfiguration } from "@components/common/configuration";
import { PocketParameter } from "@components/base/parameter";
import { PocketArgument } from "@components/base/argument";

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

        expect(PocketConfiguration.getParameterNameOrKey(param)).toBe('1');
    });

    it('should return the name, if key is not available', () => {
        const param = new PocketParameter({
            name: 'Test Parameter 2',
            default: 'defaultValue',
            required: true,
        });

        expect(PocketConfiguration.getParameterNameOrKey(param)).toBe('Test Parameter 2');
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

    it('should freeze the configuration object', () => {
        const config = new PocketConfiguration();
        expect(Object.isFrozen(config)).toBe(true);
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
        const defaultRequiredParams = PocketConfiguration.getDefaultParameterValuesAsArguments({ params: config.parameters });
        console.log(defaultRequiredParams);
        expect(defaultRequiredParams.toString()).toEqual('param1: default1');
    });

    it('should get the proper argument by name from an array of arguments', () => {
        const arg1 = new PocketArgument({ name: "arg1", value: "value1" });
        const arg2 = new PocketArgument({ name: "arg2", value: "value2" });
        const arg3 = new PocketArgument({ name: "arg3", value: "value3" });
        const args = [arg1, arg2, arg3];
        const selectedArg = PocketConfiguration.getArgumentFromArray({ args, name: "arg2" });
        expect(selectedArg).toEqual([arg2]);
    });

    it('should get the proper argument by name from an array of arguments with a default value', () => {
        const arg1 = new PocketArgument({ name: "arg1", value: "value1" });
        const arg2 = new PocketArgument({ name: "arg2", value: "value2" });
        const arg3 = new PocketArgument({ name: "arg3", value: "value3" });
        const args = [arg1, arg2, arg3];
        const selectedArg = PocketConfiguration.getArgumentFromArray({ args, name: "arg4"});
        expect(selectedArg).toEqual(undefined);
    });

    it('should check an array of arguments for duplicates, and throw an error if duplicates are found and allowDuplicates is false', () => {
        const arg1 = new PocketArgument({ name: "arg1", value: "value1" });
        const arg2 = new PocketArgument({ name: "arg1", value: "value2" });
        const arg3 = new PocketArgument({ name: "arg3", value: "value3" });
        const args = [arg1, arg2, arg3];

        try {
            PocketConfiguration.checkForDuplicateArguments({ args, allowDuplicateArgs: false });
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Duplicate argument found: arg1, arg1");
        }
    });

    it('should check an array of arguments for duplicates, and not throw an error if duplicates are found and allowDuplicates is true', () => {
        const arg1 = new PocketArgument({ name: "arg1", value: "value1" });
        const arg2 = new PocketArgument({ name: "arg1", value: "value2" });
        const arg3 = new PocketArgument({ name: "arg3", value: "value3" });
        const args = [arg1, arg2, arg3];

        const duplicateArgsCheck = PocketConfiguration.checkForDuplicateArguments({ args, allowDuplicateArgs: true });
        expect(duplicateArgsCheck).toBe(true);
    });

    it("should check an array of parameters for duplicates, and throw an error if duplicates are found and allowDuplicates is false", () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true });
        const param2 = new PocketParameter({ name: "param1", default: "default2", required: false });
        const param3 = new PocketParameter({ name: "param3", default: "default3", required: true });
        const params = [param1, param2, param3];
        try {
            PocketConfiguration.checkForDuplicateParameters({ params, allowDuplicateParams: false });
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Duplicate parameter found: param1, param1");
        }
    });

    it("should check an array of parameters for duplicates, and not throw an error if duplicates are found and allowDuplicates is true", () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true });
        const param2 = new PocketParameter({ name: "param1", default: "default2", required: false });
        const param3 = new PocketParameter({ name: "param3", default: "default3", required: true });
        const params = [param1, param2, param3];
        const duplicateParamsCheck = PocketConfiguration.checkForDuplicateParameters({ params, allowDuplicateParams: true });
        expect(duplicateParamsCheck).toBe(true);
    });

    it('should check if the passed in argument is valid or default', () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true, options: ["value1", "value2"] });
        const arg1 = new PocketArgument({ name: "param1", value: "value1" });
        const argValueCheck: boolean = PocketConfiguration.checkIfArgumentValueIsValidOrDefault({ arg: arg1, param: param1 });
        expect(argValueCheck).toBe(true);
    });

    it('should check if the passed in argument is valid or default with a default value', () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true, options: ["value1", "value2"] });
        const arg1 = new PocketArgument({ name: "param1", value: "default1" });
        const argValueCheck: boolean = PocketConfiguration.checkIfArgumentValueIsValidOrDefault({ arg: arg1, param: param1 });
        expect(argValueCheck).toBe(true);
    });

    it('should check if the passed in argument is valid or default with an invalid value', () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true, options: ["value1", "value2"] });
        const arg1 = new PocketArgument({ name: "param1", value: "invalidValue" });
        const argValueCheck: boolean = PocketConfiguration.checkIfArgumentValueIsValidOrDefault({ arg: arg1, param: param1 });
        expect(argValueCheck).toBe(false);
    });

    it("should check if the passed in argument is invalid and throws an error", () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true, options: ["value1", "value2"] });
        const arg1 = new PocketArgument({ name: "param1", value: "invalidValue" });
        try {
            PocketConfiguration.checkIfArgumentValueIsValidOrDefault({ arg: arg1, param: param1, throwError: true });
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Argument param1 is not a valid value. Possible values are: default1, value1, value2");
        }
    });

    it("should check if the passed in argument is valid or default with an empty value", () => {
        const param1 = new PocketParameter({ name: "param1", default: "default1", required: true, options: ["value1", "value2"] });
        try {
            const arg1 = new PocketArgument({ name: "param1", value: "" });
            PocketConfiguration.checkIfArgumentValueIsValidOrDefault({ arg: arg1, param: param1, throwError: true });
        }
        catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Value for the param1 argument is required because allowEmpty is false");
        }
    });
});