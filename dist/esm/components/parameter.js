import { Checks } from "../utilities/checks.js";
import { Freezer } from "../utilities/freezer.js";
class PocketParameter {
    name;
    description;
    default;
    required;
    options;
    constructor({ name, description = "", default: defaultValue = undefined, required = false, options = [] }) {
        if (Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }
        this.name = name;
        this.description = description;
        this.default = defaultValue;
        this.required = required;
        this.options = options;
        Freezer.deepFreeze(this);
    }
    get nameString() {
        return String(this.name);
    }
    checkValue(value) {
        if (this.required == true
            && Checks.isEmpty(value) == true) {
            throw new Error(`Parameter ${this.nameString} is required`);
        }
        if (this.options.length > 0
            && Checks.isEmpty(value) == false
            && Checks.isEmpty(this.options) == false
            && Checks.isEmpty(this.options.find((option) => option == value)) == true
            && !this.options.includes(value)
            && !this.default == value) {
            throw new Error(`Parameter ${this.nameString} must be one of ${this.options.join(", ")} or ${this.default}, but got ${value}`);
        }
        return true;
    }
    getValueOrDefault(value) {
        if (Checks.isEmpty(value) == true
            && this.checkValue(value) == false
            && Checks.isEmpty(this.default) == false) {
            return this.default;
        }
        return value;
    }
    getValueOrDefaultOrOptions(value) {
        let result = value;
        result = this.getValueOrDefault(value);
        if (Checks.isEmpty(result) == true
            && Checks.isEmpty(this.options) == false) {
            result = this.options[0];
        }
        return result;
    }
}
export { PocketParameter };
//# sourceMappingURL=parameter.js.map