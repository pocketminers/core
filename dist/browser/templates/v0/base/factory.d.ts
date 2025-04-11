import { StorageTypes } from "../../../components/base/index.js";
import { BaseObjectType } from "./object.js";
interface BaseFactory<S extends StorageTypes, O extends BaseObjectType> {
    /**
     * The type of the object.
     */
    type: O;
    /**
     * The storage of the object.
     */
    storage: S;
}
export { BaseFactory };
//# sourceMappingURL=factory.d.ts.map