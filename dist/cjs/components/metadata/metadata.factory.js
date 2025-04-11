"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataFactory = void 0;
const identifier_1 = require("../../templates/v0/base/identifier.js");
const object_1 = require("../../templates/v0/base/object.js");
const _1 = require("./index.js");
class MetadataFactory {
    static createDefaultMetadata(metadata) {
        if (metadata !== undefined) {
            return new _1.Metadata(metadata);
        }
        // Create default metadata
        const id = {
            type_: identifier_1.BaseIdentifierTypes.Undefined,
            value: "undefined"
        };
        const name = "";
        const type = object_1.BaseObjectTypes.Undefined;
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
        return new _1.Metadata({
            annotations,
            labels,
            timestamps
        });
    }
}
exports.MetadataFactory = MetadataFactory;
//# sourceMappingURL=metadata.factory.js.map