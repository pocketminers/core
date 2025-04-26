import { BaseIdentifierFormats, BaseIdentifierTypeList } from "../templates/v0/index.js";
import { MultiHashUtilities } from "./multiHash.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 */
var IdentifierUtilities = /** @class */ (function () {
    function IdentifierUtilities() {
    }
    /**
     * Creates a new identifier based on the provided format and options.
     * - The identifier is immutable after creation.
     *
     * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
     *
     * @example
     * const identifier = IdentifierUtilities.generateIdentifier({
     *    format: "Name",
     *    options: {
     *      prefix: "prefix-",
     *      suffix: "-suffix",
     *      length: 10
     *    }
     * });
     * console.log(identifier.value); // "prefix-abcdefghij-suffix"
     *
     * @example
     * const identifier = IdentifierUtilities.generateIdentifier({
     *   format: "UUID"
     * });
     * console.log(identifier.value); // "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
     */
    IdentifierUtilities.generateIdentifier = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.format, format = _c === void 0 ? BaseIdentifierFormats.UUID : _c, _d = _b.options, options = _d === void 0 ? {
            prefix: "",
            suffix: "",
            length: 34
        } : _d;
        var prefix = (options === null || options === void 0 ? void 0 : options.prefix) || "";
        var suffix = (options === null || options === void 0 ? void 0 : options.suffix) || "";
        var identifier = prefix;
        switch (format) {
            case "UUID":
                identifier += IdentifierUtilities.generateUUIDv4();
                break;
            case "Name":
                identifier += IdentifierUtilities.generateRandomString(options === null || options === void 0 ? void 0 : options.length);
                break;
            case "Number":
                identifier += IdentifierUtilities.generateRandomNumber(options === null || options === void 0 ? void 0 : options.length);
                break;
            case "Symbol":
                break;
            default:
                // check if the format is valid
                if (format !== undefined && !BaseIdentifierTypeList.includes(format)) {
                    throw new Error("Invalid identifier format: ".concat(format));
                }
                // identifier += IdentifierUtilities.generateRandomString(options?.length);
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
    IdentifierUtilities.checkUUIDv4Format = function (value) {
        var uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidv4Regex.test(value)) {
            return false;
        }
        return true;
    };
    IdentifierUtilities.generateUUIDv4 = function () {
        {
            var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            if (!IdentifierUtilities.checkUUIDv4Format(id)) {
                IdentifierUtilities.generateUUIDv4();
            }
            return id;
        }
    };
    IdentifierUtilities.checkRandomStringFormat = function (value, length) {
        if (length === void 0) { length = 34; }
        if (value.length !== length) {
            return false;
        }
        var randomStringRegex = /^[a-z0-9]+$/;
        if (!randomStringRegex.test(value)) {
            return false;
        }
        return true;
    };
    IdentifierUtilities.generateRandomString = function (length) {
        if (length === void 0) { length = 34; }
        var id;
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        id = '';
        for (var i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return id;
    };
    IdentifierUtilities.checkRandomNumberFormat = function (value, length) {
        if (length === void 0) { length = 34; }
        if (value.toString().length !== length) {
            return false;
        }
        var randomNumberRegex = /^[0-9]+$/;
        if (!randomNumberRegex.test(value.toString())) {
            return false;
        }
        return true;
    };
    IdentifierUtilities.generateRandomNumber = function (length) {
        if (length === void 0) { length = 34; }
        var id = Math.floor(Math.random() * Math.pow(10, length));
        if (id.toString().length !== length) {
            for (var i = id.toString().length; i < length; i++) {
                id *= 10;
            }
            id += Math.floor(Math.random() * 10);
        }
        if (!IdentifierUtilities.checkRandomNumberFormat(id, length)) {
            IdentifierUtilities.generateRandomNumber(length);
        }
        return id;
    };
    return IdentifierUtilities;
}());
export { IdentifierUtilities };
//# sourceMappingURL=identifier.js.map