import { PocketStorage } from "../base/storage";
class ArgumentStorage extends PocketStorage {
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
export { ArgumentStorage };
//# sourceMappingURL=argument.storage.js.map