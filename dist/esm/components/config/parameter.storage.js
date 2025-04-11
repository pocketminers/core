import { PocketStorage } from "../base/storage.js";
class ParameterStorage extends PocketStorage {
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
export { ParameterStorage };
//# sourceMappingURL=parameter.storage.js.map