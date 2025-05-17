"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketMetadata = void 0;
const identifier_1 = require("../../templates/v0/base/identifier.js");
const object_1 = require("../../templates/v0/base/object.js");
const freezer_1 = require("../../utilities/freezer.js");
class PocketMetadata {
    annotations;
    labels;
    timestamps;
    constructor({ id, name, type, description, tags, timestamps = {
        created: { date: new Date() },
        updated: { date: new Date() }
    }, annotations, labels } = {}) {
        this.annotations = this.addAnnotations({
            description,
            ...annotations
        });
        this.labels = this.addLabels({
            id,
            name,
            type,
            tags,
            ...labels
        });
        this.timestamps = {
            created: timestamps.created || { date: new Date() },
            updated: timestamps.updated || { date: new Date() },
            ...timestamps
        };
        freezer_1.Freezer.deepFreeze(this);
    }
    addAnnotations(annotations) {
        for (const key in annotations) {
            if (annotations[key] === undefined) {
                delete annotations[key];
            }
        }
        return {
            ...this.annotations,
            ...annotations
        };
    }
    addLabels(labels) {
        for (const key in labels) {
            if (labels[key] === undefined) {
                delete labels[key];
            }
        }
        return {
            ...this.labels,
            ...labels
        };
    }
    toJSON() {
        return {
            annotations: this.annotations,
            labels: this.labels,
            timestamps: this.timestamps
        };
    }
    toString() {
        return JSON.stringify({
            annotations: this.annotations,
            labels: this.labels,
            timestamps: this.timestamps
        });
    }
    update({ annotations, labels, timestamps }) {
        // These Values are immuteable:
        // - timestamps.created
        // - timestamps.updated
        // - labels.id
        // - labels.type
        if (timestamps?.created
            && timestamps.created.date !== undefined
            && timestamps.created.date !== this.timestamps.created?.date) {
            throw new Error("Cannot update timestamps.created");
        }
        if (timestamps?.updated
            && timestamps.updated.date !== undefined
            && timestamps.updated.date !== this.timestamps.updated?.date) {
            throw new Error("Cannot manually update timestamps.updated, the value is set to the current date");
        }
        if (labels?.id
            && labels.id.format !== identifier_1.BaseIdentifierFormats.Undefined
            && labels.id.value !== "undefined"
            && labels.id.value !== this.labels.id?.value) {
            throw new Error("Cannot update labels.id");
        }
        if (labels?.type
            && labels.type !== object_1.BaseObjects.Undefined
            && labels.type !== this.labels.type) {
            throw new Error("Cannot update labels.type");
        }
        return new PocketMetadata({
            ...this.toJSON(),
            annotations: {
                ...this.annotations,
                ...annotations
            },
            labels: {
                ...this.labels,
                ...labels
            },
            timestamps: {
                ...this.timestamps,
                ...timestamps,
                updated: { date: new Date() }
            }
        });
    }
    get id() {
        return this.labels.id;
    }
    get type() {
        return this.labels.type;
    }
    static createDefaultMetadata(metadata) {
        if (metadata !== undefined) {
            return new PocketMetadata(metadata);
        }
        // Create default metadata
        const id = {
            format: identifier_1.BaseIdentifierFormats.Undefined,
            value: "undefined"
        };
        const name = "";
        const type = object_1.BaseObjects.Undefined;
        const description = "";
        const tags = [];
        const timestamps = {
            created: { date: new Date() },
            updated: { date: new Date() }
        };
        const annotations = {
            description
        };
        const labels = {
            id,
            name,
            type,
            tags
        };
        return new PocketMetadata({
            annotations,
            labels,
            timestamps
        });
    }
}
exports.PocketMetadata = PocketMetadata;
//# sourceMappingURL=metadata.js.map