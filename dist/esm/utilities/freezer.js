class Freezer {
    static deepFreeze(obj) {
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
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            // Skip non-object properties
            const value = obj[prop];
            if (value && typeof value === "object" && !Object.isFrozen(value)) {
                Freezer.deepFreeze(value);
            }
        });
        return obj;
    }
}
export { Freezer };
//# sourceMappingURL=freezer.js.map