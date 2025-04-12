import { PocketObject } from "../base/index.js";
import { Metadata } from "../metadata/index.js";
import { MetadataFactory } from "../metadata/metadata.factory.js";
import { BaseObjectTypes } from "../../templates/v0/index.js";
import { Argument } from "./argument.js";
/**
 * Parameter is a generic class that represents a parameter object.
 * It extends the PocketObject class and implements the BaseParameter interface.
 */
class Parameter extends PocketObject {
    constructor({ name, description, default: defaultValue, required, optional, meta }) {
        if (name === undefined) {
            throw new Error("Name is required");
        }
        const data = {
            name,
            description,
            default: defaultValue,
            required,
            optional
        };
        const metadata = meta !== undefined
            ? new Metadata({ ...meta, type: BaseObjectTypes.Parameter })
            : MetadataFactory.createDefaultMetadata({ type: BaseObjectTypes.Parameter });
        super({ data, metadata });
    }
    get name() {
        return this.data.name;
    }
    get description() {
        return this.data.description;
    }
    get default() {
        return this.data.default;
    }
    get required() {
        return this.data.required;
    }
    get optional() {
        return this.data.optional;
    }
    toString() {
        return `${this.dataString}`;
    }
    toJSON() {
        return JSON.stringify(this);
    }
    toArgdefault() {
        const metadata = this.metadata;
        return new Argument({
            name: this.name,
            value: this.default,
            meta: {
                ...metadata,
                type: BaseObjectTypes.Argument
            }
        });
    }
}
export { Parameter };
//# sourceMappingURL=parameter.js.map