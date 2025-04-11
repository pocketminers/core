"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentStorage = void 0;
const storage_1 = require("../base/storage");
class ArgumentStorage extends storage_1.PocketStorage {
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
exports.ArgumentStorage = ArgumentStorage;
//# sourceMappingURL=argument.storage.js.map