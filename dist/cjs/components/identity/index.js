"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const base_1 = require("../base/index.js");
const v0_1 = require("../../templates/v0/index.js");
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
class Identity extends base_1.PocketObject {
    static type_ = v0_1.BaseIdentifierTypes.Undefined;
    static objectType = v0_1.BaseObjectTypes.Identifier;
    constructor({ type_, value }) {
        super({
            data: {
                type_,
                value
            }
        });
    }
    get type_() {
        return this.data.type_;
    }
    get value() {
        return this.data.value;
    }
}
exports.Identity = Identity;
//# sourceMappingURL=index.js.map