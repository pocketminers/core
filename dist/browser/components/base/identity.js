import { BaseIdentifierFormats } from "../../templates/v0/index.js";
import { MultiHashUtilities } from "../../utilities/multiHash.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
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
        PocketIdentity.checkIdentityType(format, value);
        this.format = format;
        this.value = value;
    }
    PocketIdentity.checkIdentityType = function (format, value) {
        switch (format) {
            case BaseIdentifierFormats.Multihash:
                if (!MultiHashUtilities.isValidMultihash(value)) {
                    throw new Error("Invalid multihash");
                }
                break;
            default:
                break;
        }
    };
    PocketIdentity.generateUUIDv4 = function () {
        {
            var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            // check the generated id format using regex
            var idRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
            if (!idRegex.test(id)) {
                return PocketIdentity.generateUUIDv4();
            }
            return id;
        }
    };
    PocketIdentity.generateRandomString = function (length) {
        if (length === void 0) { length = 34; }
        return Math.random().toString(36).substring(2, length + 2);
    };
    PocketIdentity.generateISOTimestamp = function (timestamp) {
        if (timestamp === void 0) { timestamp = Date.now(); }
        return new Date(timestamp).toISOString();
    };
    PocketIdentity.formatIdentifier = function (identifier) {
        return identifier;
    };
    PocketIdentity.checkForUUID = function (identifier) {
        return identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) !== null;
    };
    return PocketIdentity;
}());
export { PocketIdentity };
//# sourceMappingURL=identity.js.map