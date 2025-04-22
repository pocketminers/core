import { Parameter } from "../config/parameter.js";
import { PocketFactory } from "../base/factory.js";
class ParameterFactory extends PocketFactory {
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
        return new Parameter({
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
export { ParameterFactory };
//# sourceMappingURL=parameter.factory.js.map