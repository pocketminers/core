import { Parameter } from "./parameter.js";
import { Argument } from "./argument.js";
import { BaseObjectTypes, BaseStorageLocations } from "../../templates/v0/index.js";
import { PocketStorage } from "../base/index.js";
import { Checks } from "../../utilities/checks.js";
/**
 * Properties is a class that represents a storage object for arguments and parameters.
 * It extends the PocketStorage class and provides methods to manage the storage.
 */
class Properties extends PocketStorage {
    constructor({ items = [] } = {}) {
        super(items, {
            location: BaseStorageLocations.MEMORY,
            allowDuplicates: true,
            allowEmpty: true,
            maxSize: 0
        });
    }
    getArgument(name) {
        const args = this.arguments;
        const arg = args.find(arg => arg.name === name);
        // if (!arg) {
        //     throw new Error(`Argument "${String(name)}" not found.`);
        // }
        return arg;
    }
    getParameter(name) {
        const params = this.parameters;
        const param = params.find(param => param.name === name);
        // if (!param) {
        //     throw new Error(`Parameter "${String(name)}" not found.`);
        // }
        return param;
    }
    getDefaultFromParameter(name, useOptional = false) {
        const param = this.getParameter(name);
        if (!param) {
            return undefined;
        }
        const metadata = param.metadata;
        const defultValue = param.default;
        const optionalValues = param.optional;
        let value = Checks.isEmpty(defultValue) === false ? defultValue : null;
        if (useOptional === true
            && Checks.isEmpty(defultValue) === true
            && Checks.isEmpty(optionalValues) === false
            && optionalValues.length > 0) {
            value = optionalValues[0];
        }
        if (Checks.isEmpty(defultValue) === true
            && Checks.isEmpty(optionalValues) === true) {
            return undefined;
        }
        if (Checks.isEmpty(defultValue) === false) {
            return new Argument({
                name: param.name,
                value: defultValue,
                meta: {
                    ...metadata,
                    type: BaseObjectTypes.Argument
                }
            });
        }
    }
    convertArgumentFromParameter(name) {
        const param = this.getParameter(name);
        if (!param) {
            return undefined;
        }
        const metadata = param.metadata;
        const defultValue = param.default;
        const optionalValues = param.optional;
        const arg = new Argument({
            name: param.name,
            value: Checks.isEmpty(param.default) === false ? param.default : null,
            meta: {
                ...metadata,
                type: BaseObjectTypes.Argument
            }
        });
    }
    get arguments() {
        return this.items.filter(item => item instanceof Argument);
    }
    get parameters() {
        return this.items.filter(item => item instanceof Parameter);
    }
    get keysFromArgs() {
        return this.arguments.map(arg => arg.name);
    }
    get keysFromParams() {
        return this.parameters.map(param => param.name);
    }
    get requiredKeys() {
        const params = this.parameters;
        const requiredKeys = [];
        for (const param of params) {
            if (param.required) {
                requiredKeys.push(param.name);
            }
        }
        return requiredKeys;
    }
    get missingArgs() {
        const requiredKeys = this.requiredKeys;
        const args = this.arguments;
        const missingArgs = [];
        for (const key of requiredKeys) {
            if (!args.find(arg => arg.name === key)) {
                missingArgs.push(key);
            }
        }
        return missingArgs;
    }
    get defaultParams() {
        const params = this.parameters;
        const defaultParams = [];
        for (const param of params) {
            if (Checks.isEmpty(param.default) === false
                && param.default === true) {
                defaultParams.push(param);
            }
        }
        return defaultParams;
    }
    getValue(name) {
        const arg = this.getArgument(name);
        if (arg) {
            return arg;
        }
        const param = this.getParameter(name);
        if (param) {
            const metadata = param.metadata;
        }
    }
    get values() {
        const args = this.arguments;
        const params = this.parameters;
        const values = [];
        for (const param of params) {
            const arg = args.find(arg => arg.name === param.name);
            if (arg) {
                values.push(arg);
            }
            else {
                const metadata = param.metadata;
                const value = param.default;
                values.push(new Argument({
                    name: param.name,
                    value: param.default !== undefined
                        ? param.default
                        : param.optional && param.optional.length > 0
                            ? param.optional[0]
                            : null,
                    meta: {
                        ...metadata,
                        type: BaseObjectTypes.Argument
                    }
                }));
            }
        }
        return values;
    }
}
export { Properties };
//# sourceMappingURL=properties.storage.js.map