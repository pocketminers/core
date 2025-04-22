import { BaseIdentifierFormats, BaseIdentifierTypeList } from "../templates/v0/index.js";
import { MultiHashUtilities } from "./multiHash.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 */
var IdentifierUtilities = /** @class */ (function () {
    function IdentifierUtilities() {
    }
    IdentifierUtilities.create = function (_a) {
        var _b = _a === void 0 ? {} : _a, format = _b.format, _c = _b.options, options = _c === void 0 ? {
            prefix: "",
            suffix: ""
        } : _c;
        var prefix = (options === null || options === void 0 ? void 0 : options.prefix) || "";
        var suffix = (options === null || options === void 0 ? void 0 : options.suffix) || "";
        var identifier = prefix;
        switch (format) {
            case "UUID":
                identifier += IdentifierUtilities.generateUUIDv4();
                break;
            default:
                // check if the format is valid
                if (format !== undefined && !BaseIdentifierTypeList.includes(format)) {
                    throw new Error("Invalid identifier format: ".concat(format));
                }
                identifier += IdentifierUtilities.generateRandomString(options === null || options === void 0 ? void 0 : options.length);
                break;
        }
        identifier += suffix;
        if (format === undefined) {
            return {
                value: identifier,
                format: BaseIdentifierFormats.Undefined
            };
        }
        return {
            value: identifier,
            format: format
        };
    };
    IdentifierUtilities.checkIdentityFormat = function (format, value) {
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
    IdentifierUtilities.generateUUIDv4 = function () {
        {
            var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            // check the generated id format using regex
            var idRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
            if (!idRegex.test(id)) {
                return IdentifierUtilities.generateUUIDv4();
            }
            return id;
        }
    };
    IdentifierUtilities.generateRandomString = function (length) {
        if (length === void 0) { length = 34; }
        return Math.random().toString(36).substring(2, length + 2);
    };
    IdentifierUtilities.generateISOTimestamp = function (timestamp) {
        if (timestamp === void 0) { timestamp = Date.now(); }
        return new Date(timestamp).toISOString();
    };
    IdentifierUtilities.formatIdentifier = function (identifier) {
        return identifier;
    };
    IdentifierUtilities.checkForUUID = function (identifier) {
        return identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) !== null;
    };
    return IdentifierUtilities;
}());
export { IdentifierUtilities };
//# sourceMappingURL=identifier.js.map