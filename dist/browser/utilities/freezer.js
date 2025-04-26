var Freezer = /** @class */ (function () {
    function Freezer() {
    }
    Freezer.deepFreeze = function (obj) {
        // const propertyValue = (obj as Record<string, unknown>)[prop];
        // if (typeof propertyValue !== "object" || propertyValue === null) {
        //     return;
        // }
        // if (Array.isArray(propertyValue)) {
        //     propertyValue.forEach((item) => {
        //         Freezer.deepFreeze(item);
        //     });
        // } else if (typeof propertyValue === "object") {
        //     Freezer.deepFreeze(propertyValue);
        // }
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(function (prop) {
            // Skip non-object properties
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