"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketIdentity = void 0;
const freezer_1 = require("../utilities/freezer.js");
const identifier_1 = require("../utilities/identifier.js");
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
            throw new Error("Value is required");
        }
        // check if the value is the correct format
        identifier_1.IdentifierUtilities.checkIdentityFormat(format, value);
        this.format = format;
        this.value = value;
        freezer_1.Freezer.deepFreeze(this);
    }
}
exports.PocketIdentity = PocketIdentity;
//# sourceMappingURL=identity.js.map