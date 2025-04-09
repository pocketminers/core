var Checks = /** @class */ (function () {
    function Checks() {
    }
    Checks.isEmpty = function (value) {
        return value === null
            || value === undefined
            || value === ""
            || value === " "
            || (Array.isArray(value) && value.length === 0);
    };
    return Checks;
}());
export { Checks };
//# sourceMappingURL=checks.js.map