import { PocketStorage } from "../base/storage.js";
class ArgumentStorage extends PocketStorage {
    constructor(items = [], { location, allowDuplicates = false, allowEmpty = false, maxSize }) {
        super(items, {
            location,
            allowDuplicates,
            allowEmpty,
            maxSize
        });
    }
}
export { ArgumentStorage };
//# sourceMappingURL=argument.storage.js.map