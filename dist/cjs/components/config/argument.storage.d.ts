import { BaseStorageLocations } from "../../templates/v0/base/storage.js";
import { Argument } from "./argument.js";
import { PocketStorage } from "../base/storage.js";
import { BaseObjectTypes } from "../../templates/v0/index.js";
declare class ArgumentStorage<L extends BaseStorageLocations = BaseStorageLocations.MEMORY> extends PocketStorage<Argument<any>, BaseObjectTypes.Argument, L> {
    constructor({ location, items, allowDuplicates, allowEmpty, maxSize }: {
        location: L;
        items?: Array<Argument<any>>;
        allowDuplicates?: boolean;
        allowEmpty?: boolean;
        maxSize?: number;
    });
}
export { ArgumentStorage };
//# sourceMappingURL=argument.storage.d.ts.map