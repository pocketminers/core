import { BaseStorageLocations } from "../../templates/v0/base/storage.js";
import { Parameter } from "./parameter.js";
import { PocketStorage } from "../base/storage.js";
import { BaseObjectTypes } from "../../templates/v0/index.js";
declare class ParameterStorage<L extends BaseStorageLocations = BaseStorageLocations.MEMORY> extends PocketStorage<Parameter<any, any>, BaseObjectTypes.Parameter, L> {
    constructor({ location, items, allowDuplicates, allowEmpty, maxSize }: {
        location: L;
        items?: Array<Parameter<any, any>>;
        allowDuplicates?: boolean;
        allowEmpty?: boolean;
        maxSize?: number;
    });
}
export { ParameterStorage };
//# sourceMappingURL=parameter.storage.d.ts.map