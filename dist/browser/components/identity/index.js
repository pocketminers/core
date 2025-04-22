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
import { PocketObject } from "../base/index.js";
import { BaseIdentifierTypes, BaseObjectTypes } from "../../templates/v0/index.js";
/**
 * Identity is a generic class that represents an identity object.
 * It extends the PocketObject class and implements the BaseIdentifier interface.
 *
 * @template I - The type of the identifier associated with the identity.
 *
 * @extends PocketObject
 * @implements BaseIdentifier
 *
 * @example
 * const identity = new Identity({
 *     type_: "exampleType",
 *     value: "exampleValue"
 * });
 */
var Identity = /** @class */ (function (_super) {
    __extends(Identity, _super);
    function Identity(_a) {
        var type_ = _a.type_, value = _a.value;
        return _super.call(this, {
            data: {
                type_: type_,
                value: value
            }
        }) || this;
    }
    Object.defineProperty(Identity.prototype, "type_", {
        get: function () {
            return this.data.type_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Identity.prototype, "value", {
        get: function () {
            return this.data.value;
        },
        enumerable: false,
        configurable: true
    });
    Identity.type_ = BaseIdentifierTypes.Undefined;
    Identity.objectType = BaseObjectTypes.Identifier;
    return Identity;
}(PocketObject));
export { Identity };
//# sourceMappingURL=index.js.map