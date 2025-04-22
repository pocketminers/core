import { BaseIdentifierFormats, BaseIdentifierTypeList } from "../templates/v0/index.js";
import { MultiHashUtilities } from "./multiHash.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 */
class IdentifierUtilities {
    static create({ format, options = {
        prefix: "",
        suffix: ""
    } } = {}) {
        const prefix = options?.prefix || "";
        const suffix = options?.suffix || "";
        let identifier = prefix;
        switch (format) {
            case "UUID":
                identifier += IdentifierUtilities.generateUUIDv4();
                break;
            default:
                // check if the format is valid
                if (format !== undefined && !BaseIdentifierTypeList.includes(format)) {
                    throw new Error(`Invalid identifier format: ${format}`);
                }
                identifier += IdentifierUtilities.generateRandomString(options?.length);
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
            format
        };
    }
    static checkIdentityFormat(format, value) {
        switch (format) {
            case BaseIdentifierFormats.Multihash:
                if (!MultiHashUtilities.isValidMultihash(value)) {
                    throw new Error("Invalid multihash");
                }
                break;
            default:
                break;
        }
    }
    static generateUUIDv4() {
        {
            const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            // check the generated id format using regex
            const idRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
            if (!idRegex.test(id)) {
                return IdentifierUtilities.generateUUIDv4();
            }
            return id;
        }
    }
    static generateRandomString(length = 34) {
        return Math.random().toString(36).substring(2, length + 2);
    }
    static generateISOTimestamp(timestamp = Date.now()) {
        return new Date(timestamp).toISOString();
    }
    static formatIdentifier(identifier) {
        return identifier;
    }
    static checkForUUID(identifier) {
        return identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) !== null;
    }
}
export { IdentifierUtilities };
//# sourceMappingURL=identifier.js.map