import { BaseStorageLocations } from "../../templates/v0/base/storage";
import { Argument } from "./argument";
import { Storage } from "../base/storage";
import { BaseObjectTypes } from "../../templates/v0";
declare class ArgumentStorage<L extends BaseStorageLocations = BaseStorageLocations.MEMORY> extends Storage<Argument<any>, BaseObjectTypes.Argument, L> {
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