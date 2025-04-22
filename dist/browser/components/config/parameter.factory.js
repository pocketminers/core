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
import { Parameter } from "../config/parameter.js";
import { PocketFactory } from "../base/factory.js";
var ParameterFactory = /** @class */ (function (_super) {
    __extends(ParameterFactory, _super);
    function ParameterFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParameterFactory.checkParameterEntry = function (entry) {
        if (!entry) {
            throw new Error("Entry is required");
        }
        if (!entry.name) {
            throw new Error("Name is required");
        }
        if (entry.required === undefined) {
            entry.required = false;
        }
        return entry;
    };
    ParameterFactory.fromRecord = function (entry, meta) {
        entry = ParameterFactory.checkParameterEntry(entry);
        return new Parameter({
            name: entry.name,
            description: entry.description,
            default: entry.default,
            required: entry.required,
            optional: entry.optional,
            meta: meta
        });
    };
    ParameterFactory.create = function (_a) {
        var name = _a.name, description = _a.description, defaultValue = _a.default, required = _a.required, optional = _a.optional, meta = _a.meta;
        return ParameterFactory.fromRecord({
            name: name,
            description: description,
            default: defaultValue,
            required: required,
            optional: optional
        }, meta);
    };
    return ParameterFactory;
}(PocketFactory));
export { ParameterFactory };
//# sourceMappingURL=parameter.factory.js.map