class Checks {
    static isEmpty(value) {
        if (typeof value === "string") {
            return value.trim() === "";
        }
        // if (typeof value === "object") {
        //     if (Array.isArray(value)) {
        //         return value.length === 0;
        //     }
        //     if (value === null) {
        //         return true;
        //     }
        //     return Object.keys(value).length === 0;
        // }
        if (typeof value === "number") {
            return isNaN(value);
        }
        if (typeof value === "boolean") {
            return false;
        }
        return value === null
            || value === undefined
            || value === ""
            || value === " "
            || (Array.isArray(value) && value.length === 0);
    }
}
export { Checks };
//# sourceMappingURL=checks.js.map