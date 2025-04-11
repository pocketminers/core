import { StorageTypes } from "@components/base";
import { BaseObjectType } from "./object";


interface BaseFactory
<
    S extends StorageTypes,
    O extends BaseObjectType
> {
    /**
     * The type of the object.
     */
    type: O;

    /**
     * The storage of the object.
     */
    storage: S;
}


export {
    BaseFactory
}