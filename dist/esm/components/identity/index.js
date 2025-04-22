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
class Identity extends PocketObject {
    static type_ = BaseIdentifierTypes.Undefined;
    static objectType = BaseObjectTypes.Identifier;
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
export { Identity };
//# sourceMappingURL=index.js.map