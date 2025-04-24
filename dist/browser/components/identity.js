import { Freezer } from "../utilities/freezer.js";
import { IdentifierUtilities } from "../utilities/identifier.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 * - Identifiers are immutable after creation.
 *
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 *
 * @example
 */
var PocketIdentity = /** @class */ (function () {
    function PocketIdentity(_a) {
        var format = _a.format, value = _a.value;
        if (format === undefined) {
            throw new Error("Type is required");
        }
        if (value === undefined) {
            throw new Error("Value is required");
        }
        // check if the value is the correct format
        IdentifierUtilities.checkIdentityFormat(format, value);
        this.format = format;
        this.value = value;
        Freezer.deepFreeze(this);
    }
    return PocketIdentity;
}());
export { PocketIdentity };
//# sourceMappingURL=identity.js.map