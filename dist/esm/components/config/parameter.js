import { PocketObject } from "../base";
import { Metadata } from "../metadata";
import { MetadataFactory } from "../metadata/metadata.factory";
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
        const metadata = meta !== undefined ? new Metadata(meta) : MetadataFactory.createDefaultMetadata();
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
}
export { Parameter };
//# sourceMappingURL=parameter.js.map