import { Metadata } from "../metadata";
import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { Freezer } from "../../utilities/freezer";
import { MultiHashUtilities } from "../../utilities/multiHash";
/**
 * Argument is a generic class that represents a key-value pair.
 *
 */
class Argument {
    data;
    metadata;
    constructor({ name, value, meta }) {
        this.data = {
            name,
            value
        };
        this.metadata = new Metadata({
            id: {
                type_: meta?.id?.type_ || BaseIdentifierTypes.Undefined,
                value: meta?.id?.value || "undefined"
            },
            ...meta
        });
        Freezer.deepFreeze(this);
    }
    get name() {
        return this.data.name;
    }
    get value() {
        return this.data.value;
    }
    toString() {
        return `${String(this.name)}: ${this.value instanceof String ? this.value
            : this.value instanceof Number ? this.value.toString()
                : this.value instanceof Boolean ? this.value.toString()
                    : this.value instanceof Array ? `[${this.value.map(v => v?.toString()).join(", ")}]`
                        : this.value instanceof Object ? `{${Object.entries(this.value).map(([k, v]) => `${k}: ${v}`).join(", ")}}`
                            : 'undefined'}`;
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
    static fromRecord(record, meta) {
        if (record === undefined) {
            throw new Error("Record is required");
        }
        if (Object.keys(record).length === 0) {
            throw new Error("Record is empty");
        }
        if (Object.keys(record).length > 1) {
            throw new Error("Record must contain only one key-value pair");
        }
        const name = Object.keys(record)[0];
        const value = record[name];
        if (name === undefined) {
            throw new Error("Name is required");
        }
        if (value === undefined) {
            throw new Error("Value is required");
        }
        return new Argument({
            name,
            value,
            meta
        });
    }
}
export { Argument };
//# sourceMappingURL=argument.js.map