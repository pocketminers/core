import { BaseStorageLocations } from "../../templates/v0/base/storage.js";
import { Parameter } from "./parameter.js";
import { PocketStorage, PocketStorageOptions } from "../base/storage.js";
import { BaseObjectTypes } from "../../templates/v0/index.js";
declare class ParameterStorage<L extends BaseStorageLocations = BaseStorageLocations.MEMORY> extends PocketStorage<Parameter<any, any>, BaseObjectTypes.Parameter, L> {
    constructor(items: Array<Parameter<any, any>>, { location, allowDuplicates, allowEmpty, maxSize }: PocketStorageOptions<L>);
}
export { ParameterStorage };
//# sourceMappingURL=parameter.storage.d.ts.map