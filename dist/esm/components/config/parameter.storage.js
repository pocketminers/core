import { PocketStorage } from "../base/storage.js";
class ParameterStorage extends PocketStorage {
    constructor(items = [], { location, allowDuplicates = false, allowEmpty = false, maxSize }) {
        super(items, {
            location,
            allowDuplicates,
            allowEmpty,
            maxSize
        });
    }
}
export { ParameterStorage };
//# sourceMappingURL=parameter.storage.js.map