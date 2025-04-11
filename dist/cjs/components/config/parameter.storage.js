"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterStorage = void 0;
const storage_1 = require("../base/storage.js");
class ParameterStorage extends storage_1.PocketStorage {
    constructor({ location, items = [], allowDuplicates = false, allowEmpty = false, maxSize }) {
        super({
            location,
            items,
            allowDuplicates,
            allowEmpty,
            maxSize
        });
    }
}
exports.ParameterStorage = ParameterStorage;
//# sourceMappingURL=parameter.storage.js.map