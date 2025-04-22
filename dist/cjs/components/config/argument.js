"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
const object_1 = require("../base/object.js");
const metadata_1 = require("../base/metadata.js");
const identifier_1 = require("../../templates/v0/base/identifier.js");
const object_2 = require("../../templates/v0/base/object.js");
const multiHash_1 = require("../../utilities/multiHash.js");
/**
 * Argument is a generic class that represents an argument object.
 * It extends the PocketObject class and implements the BaseArgument interface.
 *
 * @template V - The type of the value associated with the argument.
 * @template I - The type of the identifier associated with the argument.
 *
 * @extends PocketObject
 * @implements BaseArgument
 *
 * @example
 * const arg = new Argument({
 *     name: "arg1",
 *     value: "value1"
 * });
 */
class Argument extends object_1.PocketObject {
    /**
     * Constructor for the Argument class.
     */
    constructor({ name, value, meta }) {
        if (name === undefined) {
            throw new Error("Name is required");
        }
        const data = {
            name,
            value
        };
        const metadata = meta !== undefined
            ? new metadata_1.Metadata({ type: object_2.BaseObjectTypes.Argument, ...meta })
            : metadata_1.Metadata.createDefaultMetadata({ type: object_2.BaseObjectTypes.Argument });
        super({ data, metadata });
    }
    /**
     * The name of the argument.
     */
    get name() {
        return this.data.name;
    }
    /**
     * The value of the argument.
     */
    get value() {
        return this.data.value;
    }
    toString() {
        const name = String(this.name);
        const value = this.value !== undefined ? JSON.stringify(this.value).replaceAll(/\"/g, '"') : "undefined"; // Convert value to string, handle undefined
        return `${name}: ${value}`;
    }
    toJsonString() {
        return JSON.stringify(this.data).replaceAll(/\"/g, '"'); // Serialize with proper JSON format, including quotation marks
    }
    toJSON() {
        return {
            name: this.name,
            value: this.value
        };
    }
    toKeyValuePair() {
        return [[this.name, this.value]];
    }
    toRecord() {
        return {
            [this.name]: this.value
        };
    }
    async toHashedIdentifier() {
        const hash = await multiHash_1.MultiHashUtilities.generateIdentifier(JSON.stringify(this.data));
        return {
            format: identifier_1.BaseIdentifierFormats.Multihash,
            value: hash.value
        };
    }
}
exports.Argument = Argument;
//# sourceMappingURL=argument.js.map