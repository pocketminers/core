import { Freezer } from "../../utilities/freezer.js";
import { IdentifierUtilities } from "../../utilities/identifier.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 * - Identifiers are immutable after creation.
 *
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 *
 * @example
 */
class PocketIdentity {
    format;
    value;
    constructor({ format, value }) {
        if (format === undefined) {
            throw new Error("Type is required");
        }
        if (value === undefined) {
            value = IdentifierUtilities.generateIdentifier({
                format: format,
                options: {
                    prefix: "",
                    suffix: ""
                }
            }).value;
        }
        else {
            // check if the value is the correct format
            IdentifierUtilities.checkIdentityFormat(format, value);
        }
        this.format = format;
        this.value = value;
        Freezer.deepFreeze(this);
    }
}
export { PocketIdentity };
//# sourceMappingURL=identity.js.map