class Checks {
    static isEmpty(value) {
        return value === null
            || value === undefined
            || value === ""
            || value === " "
            || (Array.isArray(value) && value.length === 0);
    }
}
export { Checks };
//# sourceMappingURL=checks.js.map