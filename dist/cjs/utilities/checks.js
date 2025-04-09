"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checks = void 0;
class Checks {
    static isEmpty(value) {
        return value === null
            || value === undefined
            || value === ""
            || value === " "
            || (Array.isArray(value) && value.length === 0);
    }
}
exports.Checks = Checks;
//# sourceMappingURL=checks.js.map