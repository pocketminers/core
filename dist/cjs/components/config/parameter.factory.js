"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterFactory = void 0;
const parameter_1 = require("../config/parameter.js");
const factory_1 = require("../base/factory.js");
class ParameterFactory extends factory_1.PocketFactory {
    static checkParameterEntry(entry) {
        if (!entry) {
            throw new Error("Entry is required");
        }
        if (!entry.name) {
            throw new Error("Name is required");
        }
        if (entry.required === undefined) {
            entry.required = false;
        }
        return entry;
    }
    static fromRecord(entry, meta) {
        entry = ParameterFactory.checkParameterEntry(entry);
        return new parameter_1.Parameter({
            name: entry.name,
            description: entry.description,
            default: entry.default,
            required: entry.required,
            optional: entry.optional,
            meta
        });
    }
    static create({ name, description, default: defaultValue, required, optional, meta }) {
        return ParameterFactory.fromRecord({
            name,
            description,
            default: defaultValue,
            required,
            optional
        }, meta);
    }
}
exports.ParameterFactory = ParameterFactory;
//# sourceMappingURL=parameter.factory.js.map