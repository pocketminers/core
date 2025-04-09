class Freezer {
    static deepFreeze(obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop) => {
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