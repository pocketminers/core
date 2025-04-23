"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketParameter = void 0;
const checks_1 = require("../utilities/checks.js");
const freezer_1 = require("../utilities/freezer.js");
class PocketParameter {
    name;
    description;
    default;
    required;
    options;
    constructor({ name, description = "", default: defaultValue = undefined, required = false, options = [] }) {
        if (checks_1.Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }
        this.name = name;
        this.description = description;
        this.default = defaultValue;
        this.required = required;
        this.options = options;
        freezer_1.Freezer.deepFreeze(this);
    }
    get nameString() {
        return String(this.name);
    }
    checkValue(value) {
        if (this.required == true
            && checks_1.Checks.isEmpty(value) == true) {
            throw new Error(`Parameter ${this.nameString} is required`);
        }
        if (this.options.length > 0
            && checks_1.Checks.isEmpty(value) == false
            && checks_1.Checks.isEmpty(this.options) == false
            && checks_1.Checks.isEmpty(this.options.find((option) => option == value)) == true
            && !this.options.includes(value)
            && !this.default == value) {
            throw new Error(`Parameter ${this.nameString} must be one of ${this.options.join(", ")} or ${this.default}, but got ${value}`);
        }
        return true;
    }
    getValueOrDefault(value) {
        if (checks_1.Checks.isEmpty(value) == true
            && this.checkValue(value) == false
            && checks_1.Checks.isEmpty(this.default) == false) {
            return this.default;
        }
        return value;
    }
    getValueOrDefaultOrOptions(value) {
        let result = value;
        result = this.getValueOrDefault(value);
        if (checks_1.Checks.isEmpty(result) == true
            && checks_1.Checks.isEmpty(this.options) == false) {
            result = this.options[0];
        }
        return result;
    }
}
exports.PocketParameter = PocketParameter;
//# sourceMappingURL=parameter.js.map