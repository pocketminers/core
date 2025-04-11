import { PocketObject } from "../base/object";
import { Metadata } from "../metadata";
import { MetadataFactory } from "../metadata/metadata.factory";
import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { MultiHashUtilities } from "../../utilities/multiHash";
/**
 * Argument is a generic class that represents a key-value pair.
 *
 */
class Argument extends PocketObject {
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
        const metadata = meta !== undefined ? new Metadata(meta) : MetadataFactory.createDefaultMetadata();
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
        const hash = await MultiHashUtilities.generateIdentifier(this.toString());
        return {
            type_: BaseIdentifierTypes.Multihash,
            value: hash.value
        };
    }
}
export { Argument };
//# sourceMappingURL=argument.js.map