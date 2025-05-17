/**
 * The Freezer class provides methods to freeze and thaw objects.
 * Freezing an object makes it immutable, while thawing restores its mutability.
 */
var Freezer = /** @class */ (function () {
    function Freezer() {
    }
    /**
     * Freezes an object and all its properties recursively.
     * @param obj The object to freeze.
     * @returns The frozen object.
     */
    Freezer.deepFreeze = function (obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(function (prop) {
            // Skip non-object properties
            if (prop === "constructor" || prop === "prototype") {
                return;
            }
            // Skip frozen properties
            if (Object.isFrozen(obj[prop])) {
                return;
            }
            // Recursively freeze properties that are objects
            // and not already frozen
            var value = obj[prop];
            if (value && typeof value === "object" && !Object.isFrozen(value)) {
                Freezer.deepFreeze(value);
            }
        });
        return obj;
    };
    /**
     * Thaws a frozen object and all its properties recursively.
     * @param obj The object to thaw.
     * @returns The thawed object.
     */
    Freezer.thaw = function (obj) {
        if (Object.isFrozen(obj)) {
            var thawedObj_1 = Object.create(Object.getPrototypeOf(obj));
            Object.getOwnPropertyNames(obj).forEach(function (prop) {
                var value = obj[prop];
                if (value && typeof value === "object") {
                    thawedObj_1[prop] = Freezer.thaw(value);
                }
                else {
                    thawedObj_1[prop] = value;
                }
            });
            return thawedObj_1;
        }
        return obj;
    };
    return Freezer;
}());
export { Freezer };
//# sourceMappingURL=freezer.js.map