var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { BaseObjectTypes } from "../../templates/v0/base/object";
import { Freezer } from "../../utilities/freezer";
var Metadata = /** @class */ (function () {
    function Metadata(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, name = _b.name, type = _b.type, description = _b.description, tags = _b.tags, _c = _b.timestamps, timestamps = _c === void 0 ? {
            created: { date: new Date() },
            updated: { date: new Date() }
        } : _c, annotations = _b.annotations, labels = _b.labels;
        this.annotations = this.addAnnotations(__assign({ description: description }, annotations));
        this.labels = this.addLabels(__assign({ id: id, name: name, type: type, tags: tags }, labels));
        this.timestamps = __assign({ created: timestamps.created || { date: new Date() }, updated: timestamps.updated || { date: new Date() } }, timestamps);
        Freezer.deepFreeze(this);
    }
    Metadata.prototype.addAnnotations = function (annotations) {
        for (var key in annotations) {
            if (annotations[key] === undefined) {
                delete annotations[key];
            }
        }
        return __assign(__assign({}, this.annotations), annotations);
    };
    Metadata.prototype.addLabels = function (labels) {
        for (var key in labels) {
            if (labels[key] === undefined) {
                delete labels[key];
            }
        }
        return __assign(__assign({}, this.labels), labels);
    };
    Metadata.prototype.toJSON = function () {
        return {
            annotations: this.annotations,
            labels: this.labels,
            timestamps: this.timestamps
        };
    };
    Metadata.prototype.toString = function () {
        return JSON.stringify({
            annotations: this.annotations,
            labels: this.labels,
            timestamps: this.timestamps
        });
    };
    Metadata.prototype.update = function (_a) {
        // These Values are immuteable:
        // - timestamps.created
        // - labels.id
        // - labels.type
        var _b, _c, _d;
        var annotations = _a.annotations, labels = _a.labels, timestamps = _a.timestamps;
        if ((timestamps === null || timestamps === void 0 ? void 0 : timestamps.created)
            && timestamps.created.date !== undefined
            && timestamps.created.date !== ((_b = this.timestamps.created) === null || _b === void 0 ? void 0 : _b.date)) {
            throw new Error("Cannot update timestamps.created");
        }
        if ((timestamps === null || timestamps === void 0 ? void 0 : timestamps.updated)
            && timestamps.updated.date !== undefined
            && timestamps.updated.date !== ((_c = this.timestamps.updated) === null || _c === void 0 ? void 0 : _c.date)) {
            throw new Error("Cannot manually update timestamps.updated, the value is set to the current date");
        }
        if ((labels === null || labels === void 0 ? void 0 : labels.id)
            && labels.id.type_ !== BaseIdentifierTypes.Undefined
            && labels.id.value !== "undefined"
            && labels.id.value !== ((_d = this.labels.id) === null || _d === void 0 ? void 0 : _d.value)) {
            throw new Error("Cannot update labels.id");
        }
        if ((labels === null || labels === void 0 ? void 0 : labels.type)
            && labels.type !== BaseObjectTypes.Undefined
            && labels.type !== this.labels.type) {
            throw new Error("Cannot update labels.type");
        }
        return new Metadata(__assign(__assign({}, this.toJSON()), { annotations: __assign(__assign({}, this.annotations), annotations), labels: __assign(__assign({}, this.labels), labels), timestamps: __assign(__assign(__assign({}, this.timestamps), timestamps), { updated: { date: new Date() } }) }));
    };
    Object.defineProperty(Metadata.prototype, "id", {
        get: function () {
            return this.labels.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Metadata.prototype, "type", {
        get: function () {
            return this.labels.type;
        },
        enumerable: false,
        configurable: true
    });
    return Metadata;
}());
export { Metadata };
//# sourceMappingURL=index.js.map