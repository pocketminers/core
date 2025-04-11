"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
const base_1 = require("../base");
const metadata_1 = require("../metadata");
const metadata_factory_1 = require("../metadata/metadata.factory");
const v0_1 = require("../../templates/v0");
/**
 * Parameter is a generic class that represents a parameter object.
 * It extends the PocketObject class and implements the BaseParameter interface.
 */
class Parameter extends base_1.PocketObject {
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
            ? new metadata_1.Metadata({ ...meta, type: v0_1.BaseObjectTypes.Parameter })
            : metadata_factory_1.MetadataFactory.createDefaultMetadata({ type: v0_1.BaseObjectTypes.Parameter });
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
exports.Parameter = Parameter;
//# sourceMappingURL=parameter.js.map