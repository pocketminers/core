"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentStorage = void 0;
const storage_1 = require("../base/storage.js");
class ArgumentStorage extends storage_1.PocketStorage {
    constructor(items = [], { location, allowDuplicates = false, allowEmpty = false, maxSize }) {
        super(items, {
            location,
            allowDuplicates,
            allowEmpty,
            maxSize
        });
    }
}
exports.ArgumentStorage = ArgumentStorage;
//# sourceMappingURL=argument.storage.js.map