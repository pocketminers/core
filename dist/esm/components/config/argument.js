import { PocketObject } from "../base/object.js";
import { Metadata } from "../base/metadata.js";
import { BaseIdentifierFormats } from "../../templates/v0/base/identifier.js";
import { BaseObjectTypes } from "../../templates/v0/base/object.js";
import { MultiHashUtilities } from "../../utilities/multiHash.js";
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
        const metadata = meta !== undefined
            ? new Metadata({ type: BaseObjectTypes.Argument, ...meta })
            : Metadata.createDefaultMetadata({ type: BaseObjectTypes.Argument });
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
        const hash = await MultiHashUtilities.generateIdentifier(JSON.stringify(this.data));
        return {
            format: BaseIdentifierFormats.Multihash,
            value: hash.value
        };
    }
}
export { Argument };
//# sourceMappingURL=argument.js.map