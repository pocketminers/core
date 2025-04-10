import { Metadata } from "../metadata";
import { Freezer } from "../../utilities/freezer";
var PocketObject = /** @class */ (function () {
    function PocketObject(data, metadata) {
        this.data = data;
        this.metadata = metadata !== undefined ? metadata : Metadata.createDefaultMetadata();
        Freezer.deepFreeze(this);
    }
    Object.defineProperty(PocketObject.prototype, "dataString", {
        get: function () {
            return JSON.stringify(this.data);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PocketObject.prototype, "metadataString", {
        get: function () {
            return JSON.stringify(this.metadata);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PocketObject.prototype, "objectString", {
        get: function () {
            return JSON.stringify(this);
        },
        enumerable: false,
        configurable: true
    });
    return PocketObject;
}());
export { PocketObject };
//# sourceMappingURL=object.js.map