import { BaseStorageLocation, BaseStorageLocations } from "@templates/v0/base/storage";
import { Parameter } from "./parameter";
import { PocketStorage, PocketStorageOptions } from "@components/base/storage";
import { BaseIdentifierFormats, BaseObjectTypes } from "@templates/v0";

interface ParameterEntry
<
    L extends BaseStorageLocation = BaseStorageLocations.MEMORY
>
    extends
        Record<'location', L>,
        Record<'items', Array<Parameter<any, any>>>,
        Record<'allowDuplicates', boolean>,
        Record<'allowEmpty', boolean> {}

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
    constructor(
        items: Array<Parameter<any, any>> = [],
        {
            location,
            allowDuplicates = false,
            allowEmpty = false,
            maxSize
        }: PocketStorageOptions<L>
    ) {
        super(
            items,
            {
                location,
                allowDuplicates,
                allowEmpty,
                maxSize
            }
        );
    }
}

export {
    ParameterStorage
}
