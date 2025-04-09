"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
const metadata_1 = require("../metadata");
const identifier_1 = require("../../templates/v0/base/identifier");
const freezer_1 = require("../../utilities/freezer");
const multiHash_1 = require("../../utilities/multiHash");
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
        this.metadata = new metadata_1.Metadata({
            id: {
                type_: meta?.id?.type_ || identifier_1.BaseIdentifierTypes.Undefined,
                value: meta?.id?.value || "undefined"
            },
            ...meta
        });
        freezer_1.Freezer.deepFreeze(this);
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
        const hash = await multiHash_1.MultiHashUtilities.generateIdentifier(this.toString());
        return {
            type_: identifier_1.BaseIdentifierTypes.Multihash,
            value: hash.value
        };
    }
}
exports.Argument = Argument;
//# sourceMappingURL=argument.js.map