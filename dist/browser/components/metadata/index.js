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
var Metadata = /** @class */ (function () {
    function Metadata(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, _c = _b.name, name = _c === void 0 ? "" : _c, type = _b.type, _d = _b.description, description = _d === void 0 ? "" : _d, _e = _b.tags, tags = _e === void 0 ? [] : _e, _f = _b.timestamps, timestamps = _f === void 0 ? {
            created: { date: new Date() },
            updated: { date: new Date() }
        } : _f, _g = _b.annotations, annotations = _g === void 0 ? {} : _g, _h = _b.labels, labels = _h === void 0 ? {} : _h;
        this.annotations = __assign({ description: description }, annotations);
        this.labels = __assign({ id: id, name: name, tags: tags, type: type }, labels);
        this.timestamps = __assign({ created: timestamps.created, updated: timestamps.updated }, timestamps);
        Object.freeze(this.annotations);
        Object.freeze(this.labels);
    }
    return Metadata;
}());
export { Metadata };
//# sourceMappingURL=index.js.map