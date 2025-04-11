"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiHashUtilities = void 0;
const identifier_1 = require("../templates/v0/base/identifier.js");
class MultiHashUtilities {
    static async hashString(input) {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }
    /**
     * Generates a multihash from a given string input.
     * The multihash is a hash of the input string, encoded in hexadecimal format.
     */
    static async generateMultihash(input) {
        const hash = await this.hashString(input);
        return `0x${hash}`;
    }
    /**
     * Generates a multihash from a given string input and returns it as a Identifier.
     */
    static async generateIdentifier(input) {
        const hash = await this.generateMultihash(input);
        return {
            type_: identifier_1.BaseIdentifierTypes.Multihash,
            value: hash
        };
    }
}
exports.MultiHashUtilities = MultiHashUtilities;
//# sourceMappingURL=multiHash.js.map