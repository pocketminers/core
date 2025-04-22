var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { PocketObject } from "../base/index.js";
import { Metadata } from "../metadata/index.js";
import { MetadataFactory } from "../metadata/metadata.factory.js";
import { BaseObjectTypes } from "../../templates/v0/index.js";
import { Argument } from "./argument.js";
/**
 * Parameter is a generic class that represents a parameter object.
 * It extends the PocketObject class and implements the BaseParameter interface.
 */
var Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    function Parameter(_a) {
        var name = _a.name, description = _a.description, defaultValue = _a.default, required = _a.required, optional = _a.optional, meta = _a.meta;
        if (name === undefined) {
            throw new Error("Name is required");
        }
        var data = {
            name: name,
            description: description,
            default: defaultValue,
            required: required,
            optional: optional
        };
        var metadata = meta !== undefined
            ? new Metadata(__assign(__assign({}, meta), { type: BaseObjectTypes.Parameter }))
            : MetadataFactory.createDefaultMetadata({ type: BaseObjectTypes.Parameter });
        return _super.call(this, { data: data, metadata: metadata }) || this;
    }
    Object.defineProperty(Parameter.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "description", {
        get: function () {
            return this.data.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "default", {
        get: function () {
            return this.data.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "required", {
        get: function () {
            return this.data.required;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "optional", {
        get: function () {
            return this.data.optional;
        },
        enumerable: false,
        configurable: true
    });
    Parameter.prototype.toString = function () {
        return "".concat(this.dataString);
    };
    Parameter.prototype.toJSON = function () {
        return JSON.stringify(this);
    };
    Parameter.prototype.toArgDefault = function () {
        var metadata = this.metadata;
        return new Argument({
            name: this.name,
            value: this.default,
            meta: __assign(__assign({}, metadata), { type: BaseObjectTypes.Argument })
        });
    };
    return Parameter;
}(PocketObject));
export { Parameter };
//# sourceMappingURL=parameter.js.map