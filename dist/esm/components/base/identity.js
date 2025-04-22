import { Freezer } from "../../utilities/freezer.js";
import { IdentifierUtilities } from "../../utilities/identifier.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 */
class PocketIdentity {
    format;
    value;
    constructor({ format, value }) {
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
}
export { PocketIdentity };
//# sourceMappingURL=identity.js.map