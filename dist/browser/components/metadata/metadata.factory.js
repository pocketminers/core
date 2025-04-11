import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { BaseObjectTypes } from "../../templates/v0/base/object";
import { Metadata } from ".";
var MetadataFactory = /** @class */ (function () {
    function MetadataFactory() {
    }
    MetadataFactory.createDefaultMetadata = function (metadata) {
        if (metadata !== undefined) {
            return new Metadata(metadata);
        }
        // Create default metadata
        var id = {
            type_: BaseIdentifierTypes.Undefined,
            value: "undefined"
        };
        var name = "";
        var type = BaseObjectTypes.Undefined;
        var description = "";
        var tags = [];
        var timestamps = {
            created: { date: new Date() },
            updated: { date: new Date() }
        };
        var annotations = {
            description: description
        };
        var labels = {
            id: id,
            name: name,
            type: type,
            tags: tags
        };
        return new Metadata({
            annotations: annotations,
            labels: labels,
            timestamps: timestamps
        });
    };
    return MetadataFactory;
}());
export { MetadataFactory };
//# sourceMappingURL=metadata.factory.js.map