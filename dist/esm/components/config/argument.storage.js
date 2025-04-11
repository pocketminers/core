import { Storage } from "../base/storage";
class ArgumentStorage extends Storage {
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