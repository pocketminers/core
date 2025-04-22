"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Properties = void 0;
const parameter_1 = require("./parameter.js");
const argument_1 = require("./argument.js");
const v0_1 = require("../../templates/v0/index.js");
const base_1 = require("../base/index.js");
const checks_1 = require("../../utilities/checks.js");
/**
 * Properties is a class that represents a storage object for arguments and parameters.
 * It extends the PocketStorage class and provides methods to manage the storage.
 */
class Properties extends base_1.PocketStorage {
    constructor({ items = [], location = v0_1.BaseStorageLocations.MEMORY, allowDuplicates = true, allowEmpty = true, maxSize = 0 } = {}) {
        super(items, {
            location,
            allowDuplicates,
            allowEmpty,
            maxSize
        });
    }
    getArgument(name) {
        const args = this.arguments;
        const arg = args.find(arg => arg.name === name);
        return arg;
    }
    getParameter(name) {
        const params = this.parameters;
        const param = params.find(param => param.name === name);
        return param;
    }
    getDefaultFromParameter(name, useOptional = false) {
        const param = this.getParameter(name);
        if (!param) {
            return undefined;
        }
        const metadata = param.metadata;
        const defultValue = param.default;
        const optionalValues = param.optional !== undefined ? param.optional : [];
        let value = checks_1.Checks.isEmpty(defultValue) === false ? defultValue : null;
        if (useOptional === true
            && checks_1.Checks.isEmpty(defultValue) === true
            && checks_1.Checks.isEmpty(optionalValues) === false
            && optionalValues.length > 0) {
            value = optionalValues[0];
        }
        if (checks_1.Checks.isEmpty(defultValue) === true
            && checks_1.Checks.isEmpty(optionalValues) === true) {
            return undefined;
        }
        if (checks_1.Checks.isEmpty(defultValue) === false) {
            return new argument_1.Argument({
                name: param.name,
                value: defultValue,
                meta: {
                    ...metadata,
                    type: v0_1.BaseObjectTypes.Argument
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
        const arg = new argument_1.Argument({
            name: param.name,
            value: checks_1.Checks.isEmpty(param.default) === false ? param.default : null,
            meta: {
                ...metadata,
                type: v0_1.BaseObjectTypes.Argument
            }
        });
    }
    get arguments() {
        return this.items.filter(item => item instanceof argument_1.Argument);
    }
    get parameters() {
        return this.items.filter(item => item instanceof parameter_1.Parameter);
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
            if (checks_1.Checks.isEmpty(param.default) === false
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
                values.push(new argument_1.Argument({
                    name: param.name,
                    value: param.default !== undefined
                        ? param.default
                        : param.optional && param.optional.length > 0
                            ? param.optional[0]
                            : null,
                    meta: {
                        ...metadata,
                        type: v0_1.BaseObjectTypes.Argument
                    }
                }));
            }
        }
        return values;
    }
}
exports.Properties = Properties;
//# sourceMappingURL=properties.storage.js.map