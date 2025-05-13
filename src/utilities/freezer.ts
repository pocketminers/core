
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
    public static deepFreeze<T>(obj: T): T {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            // Skip non-object properties
            if (prop === "constructor" || prop === "prototype") {
                return;
            }

            // Skip frozen properties
            if (Object.isFrozen((obj as any)[prop])) {
                return;
            }

            // Recursively freeze properties that are objects
            // and not already frozen
            const value = (obj as any)[prop];
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
    public static thaw<T>(obj: T): T {
        if (Object.isFrozen(obj)) {
            const thawedObj = Object.create(Object.getPrototypeOf(obj));
            Object.getOwnPropertyNames(obj).forEach((prop) => {
                const value = (obj as any)[prop];
                if (value && typeof value === "object") {
                    (thawedObj as any)[prop] = Freezer.thaw(value);
                } else {
                    (thawedObj as any)[prop] = value;
                }
            });
            return thawedObj;
        }
        return obj;
    }
}

export {
    Freezer
}