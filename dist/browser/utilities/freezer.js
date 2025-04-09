var Freezer = /** @class */ (function () {
    function Freezer() {
    }
    Freezer.deepFreeze = function (obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(function (prop) {
            var value = obj[prop];
            if (value && typeof value === "object" && !Object.isFrozen(value)) {
                Freezer.deepFreeze(value);
            }
        });
        return obj;
    };
    return Freezer;
}());
export { Freezer };
//# sourceMappingURL=freezer.js.map