import { BaseStorageLocation, BaseStorageLocations } from "@templates/v0/base/storage";
import { Argument } from "./argument";
import { PocketStorage } from "@components/base/storage";
import { BaseObjectTypes } from "@templates/v0";

class ArgumentStorage
<
    L extends BaseStorageLocations = BaseStorageLocations.MEMORY
>
    extends 
        PocketStorage<
            Argument<any>,
            BaseObjectTypes.Argument,
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
        items?: Array<Argument<any>>;
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
    ArgumentStorage
}