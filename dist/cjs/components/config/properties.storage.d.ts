import { Parameter } from "./parameter.js";
import { Argument } from "./argument.js";
import { BaseObjectTypes, BaseStorageLocations, BaseValueKey } from "../../templates/v0/index.js";
import { PocketStorage } from "../base/index.js";
/**
 * Properties is a class that represents a storage object for arguments and parameters.
 * It extends the PocketStorage class and provides methods to manage the storage.
 */
declare class Properties extends PocketStorage<Argument<any, any> | Parameter<any, any>, BaseObjectTypes.Argument | BaseObjectTypes.Parameter, BaseStorageLocations.MEMORY> {
    constructor({ items }?: {
        items?: Array<Argument<any, any> | Parameter<any, any>>;
    });
    getArgument(name: BaseValueKey): Argument<any, any> | undefined;
    getParameter(name: BaseValueKey): Parameter<any, any> | undefined;
    getDefaultFromParameter(name: BaseValueKey, useOptional?: boolean): Argument<any, any> | undefined;
    convertArgumentFromParameter(name: BaseValueKey): Argument<any, any> | undefined;
    get arguments(): Array<Argument<any, any>>;
    get parameters(): Array<Parameter<any, any>>;
    private get keysFromArgs();
    private get keysFromParams();
    get requiredKeys(): Array<BaseValueKey>;
    get missingArgs(): Array<BaseValueKey>;
    get defaultParams(): Array<Parameter<any, any>>;
    getValue(name: BaseValueKey): Argument<any, any> | undefined;
    get values(): Array<Argument<any, any>>;
}
export { Properties };
//# sourceMappingURL=properties.storage.d.ts.map