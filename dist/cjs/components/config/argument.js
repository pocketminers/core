"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
const object_1 = require("../base/object");
const metadata_1 = require("../metadata");
const metadata_factory_1 = require("../metadata/metadata.factory");
const identifier_1 = require("../../templates/v0/base/identifier");
const object_2 = require("../../templates/v0/base/object");
const multiHash_1 = require("../../utilities/multiHash");
/**
 * Argument is a generic class that represents a key-value pair.
 *
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
            : metadata_factory_1.MetadataFactory.createDefaultMetadata({ type: object_2.BaseObjectTypes.Argument });
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
        const hash = await multiHash_1.MultiHashUtilities.generateIdentifier(this.toString());
        return {
            type_: identifier_1.BaseIdentifierTypes.Multihash,
            value: hash.value
        };
    }
}
exports.Argument = Argument;
//# sourceMappingURL=argument.js.map