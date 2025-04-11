import { BaseStorageLocations } from "@templates/v0/base/storage";
import { Parameter } from "./parameter";
import { PocketStorage } from "@components/base/storage";
import { BaseObjectTypes } from "@templates/v0";

class ParameterStorage
<
    L extends BaseStorageLocations = BaseStorageLocations.MEMORY
>
    extends 
        PocketStorage<
            Parameter<any, any>,
            BaseObjectTypes.Parameter,
            L
        >
{
    constructor({
        location,
        items = [],
        allowDuplicates = false,
        allowEmpty = false,
        maxSize
    }: {
        location: L;
        items?: Array<Parameter<any, any>>;
        allowDuplicates?: boolean;
        allowEmpty?: boolean;
        maxSize?: number;
    }) {
        super({
            location,
            items,
            allowDuplicates,
            allowEmpty,
            maxSize
        });
    }
}

export {
    ParameterStorage
}
