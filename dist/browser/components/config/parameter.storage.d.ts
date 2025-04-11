import { BaseStorageLocations } from "../../templates/v0/base/storage";
import { Parameter } from "./parameter";
import { PocketStorage } from "../base/storage";
import { BaseObjectTypes } from "../../templates/v0";
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