import { BaseFactory, BaseObjectType } from "../../templates/v0";
import { StorageTypes } from "./storage";
declare class PocketFactory<S extends StorageTypes, O extends BaseObjectType> implements BaseFactory<S, O> {
    /**
     * The type of the object.
     */
    type: O;
    /**
     * The storage of the object.
     */
    storage: S;
    constructor({ type, storage }: {
        type: O;
        storage: S;
    });
}
export { PocketFactory };
//# sourceMappingURL=factory.d.ts.map