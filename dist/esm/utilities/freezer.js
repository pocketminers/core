/**
 * The Freezer class provides methods to freeze and thaw objects.
 * Freezing an object makes it immutable, while thawing restores its mutability.
 */
class Freezer {
    /**
     * Freezes an object and all its properties recursively.
     * @param obj The object to freeze.
     * @returns The frozen object.
     */
    static deepFreeze(obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop) => {
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
            const value = obj[prop];
            if (value && typeof value === "object" && !Object.isFrozen(value)) {
                Freezer.deepFreeze(value);
            }
        });
        return obj;
    }
    /**
     * Thaws a frozen object and all its properties recursively.
     * @param obj The object to thaw.
     * @returns The thawed object.
     */
    static thaw(obj) {
        if (Object.isFrozen(obj)) {
            const thawedObj = Object.create(Object.getPrototypeOf(obj));
            Object.getOwnPropertyNames(obj).forEach((prop) => {
                const value = obj[prop];
                if (value && typeof value === "object") {
                    thawedObj[prop] = Freezer.thaw(value);
                }
                else {
                    thawedObj[prop] = value;
                }
            });
            return thawedObj;
        }
        return obj;
    }
}
export { Freezer };
//# sourceMappingURL=freezer.js.map