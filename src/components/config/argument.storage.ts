import { BaseStorageLocation, BaseStorageLocations } from "@templates/v0/base/storage";
import { Argument } from "./argument";
import { PocketStorage, PocketStorageOptions } from "@components/base/storage";
import { BaseObjectTypes } from "@templates/v0";

class ArgumentStorage
<
    L extends BaseStorageLocations = BaseStorageLocations.MEMORY
>
    extends 
        PocketStorage
        <
            Argument<any, any>,
            BaseObjectTypes.Argument,
            L
        >
{
    constructor(
        items: Array<Argument<any, any>> = [],
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
    ArgumentStorage
}