"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
class Metadata {
    annotations;
    labels;
    timestamps;
    constructor({ id, name = "", type, description = "", tags = [], timestamps = {
        created: { date: new Date() },
        updated: { date: new Date() }
    }, annotations = {}, labels = {} } = {}) {
        this.annotations = {
            description,
            ...annotations
        };
        this.labels = {
            id,
            name,
            tags,
            type,
            ...labels
        };
        this.timestamps = {
            created: timestamps.created,
            updated: timestamps.updated,
            ...timestamps
        };
        Object.freeze(this.annotations);
        Object.freeze(this.labels);
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=index.js.map