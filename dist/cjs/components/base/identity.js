"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketIdentity = void 0;
const v0_1 = require("../../templates/v0/index.js");
const multiHash_1 = require("../../utilities/multiHash.js");
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
        PocketIdentity.checkIdentityType(format, value);
        this.format = format;
        this.value = value;
    }
    static checkIdentityType(format, value) {
        switch (format) {
            case v0_1.BaseIdentifierFormats.Multihash:
                if (!multiHash_1.MultiHashUtilities.isValidMultihash(value)) {
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
                return PocketIdentity.generateUUIDv4();
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
exports.PocketIdentity = PocketIdentity;
//# sourceMappingURL=identity.js.map