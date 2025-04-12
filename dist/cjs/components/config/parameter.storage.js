"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterStorage = void 0;
const storage_1 = require("../base/storage.js");
class ParameterStorage extends storage_1.PocketStorage {
    constructor(items = [], { location, allowDuplicates = false, allowEmpty = false, maxSize }) {
        super(items, {
            location,
            allowDuplicates,
            allowEmpty,
            maxSize
        });
    }
}
exports.ParameterStorage = ParameterStorage;
//# sourceMappingURL=parameter.storage.js.map