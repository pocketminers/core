import { BaseIdentifierTypes } from "../../templates/v0/base/identifier.js";
import { BaseObjectTypes } from "../../templates/v0/base/object.js";
import { Metadata } from "./index.js";
class MetadataFactory {
    static createDefaultMetadata(metadata) {
        if (metadata !== undefined) {
            return new Metadata(metadata);
        }
        // Create default metadata
        const id = {
            type_: BaseIdentifierTypes.Undefined,
            value: "undefined"
        };
        const name = "";
        const type = BaseObjectTypes.Undefined;
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
        return new Metadata({
            annotations,
            labels,
            timestamps
        });
    }
}
export { MetadataFactory };
//# sourceMappingURL=metadata.factory.js.map