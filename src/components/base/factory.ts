import { BaseObjectType } from "@templates/v0";
import { StorageTypes } from "./storage";

class PocketFactory
<
    S extends StorageTypes,
    O extends BaseObjectType,
> {
    /**
     * The type of the object.
     */
    public type: O;

    /**
     * The storage of the object.
     */
    public storage: S;

    constructor({
        type,
        storage
    }: {
        type: O;
        storage: S;
    }) {
        this.type = type;
        this.storage = storage;
    }
}

export {
    PocketFactory
}