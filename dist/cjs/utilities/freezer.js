"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Freezer = void 0;
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
exports.Freezer = Freezer;
//# sourceMappingURL=freezer.js.map