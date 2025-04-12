import { BaseStorageLocations } from "../../templates/v0/base/storage.js";
import { Argument } from "./argument.js";
import { PocketStorage, PocketStorageOptions } from "../base/storage.js";
import { BaseObjectTypes } from "../../templates/v0/index.js";
declare class ArgumentStorage<L extends BaseStorageLocations = BaseStorageLocations.MEMORY> extends PocketStorage<Argument<any, any>, BaseObjectTypes.Argument, L> {
    constructor(items: Array<Argument<any, any>>, { location, allowDuplicates, allowEmpty, maxSize }: PocketStorageOptions<L>);
}
export { ArgumentStorage };
//# sourceMappingURL=argument.storage.d.ts.map