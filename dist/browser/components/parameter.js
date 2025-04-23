import { Checks } from "../utilities/checks.js";
import { Freezer } from "../utilities/freezer.js";
var PocketParameter = /** @class */ (function () {
    function PocketParameter(_a) {
        var name = _a.name, _b = _a.description, description = _b === void 0 ? "" : _b, _c = _a.default, defaultValue = _c === void 0 ? undefined : _c, _d = _a.required, required = _d === void 0 ? false : _d, _e = _a.options, options = _e === void 0 ? [] : _e;
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
    Object.defineProperty(PocketParameter.prototype, "nameString", {
        get: function () {
            return String(this.name);
        },
        enumerable: false,
        configurable: true
    });
    PocketParameter.prototype.checkValue = function (value) {
        if (this.required == true
            && Checks.isEmpty(value) == true) {
            throw new Error("Parameter ".concat(this.nameString, " is required"));
        }
        if (this.options.length > 0
            && Checks.isEmpty(value) == false
            && Checks.isEmpty(this.options) == false
            && Checks.isEmpty(this.options.find(function (option) { return option == value; })) == true
            && !this.options.includes(value)
            && !this.default == value) {
            throw new Error("Parameter ".concat(this.nameString, " must be one of ").concat(this.options.join(", "), " or ").concat(this.default, ", but got ").concat(value));
        }
        return true;
    };
    PocketParameter.prototype.getValueOrDefault = function (value) {
        if (Checks.isEmpty(value) == true
            && this.checkValue(value) == false
            && Checks.isEmpty(this.default) == false) {
            return this.default;
        }
        return value;
    };
    PocketParameter.prototype.getValueOrDefaultOrOptions = function (value) {
        var result = value;
        result = this.getValueOrDefault(value);
        if (Checks.isEmpty(result) == true
            && Checks.isEmpty(this.options) == false) {
            result = this.options[0];
        }
        return result;
    };
    return PocketParameter;
}());
export { PocketParameter };
//# sourceMappingURL=parameter.js.map