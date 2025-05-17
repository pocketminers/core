import { Freezer } from "../../utilities/freezer.js";
import { Configurable } from "../base/configurable.js";
import { MultiHashUtilities } from "../../utilities/multiHash.js";
/**
 * The Immuteable class is a base class that provides immutability to its instances.
 * - It uses the Freezer utility to deep freeze the object and its properties.
 * - This ensures that the object cannot be modified after it has been created.
 */
class Immuteable extends Configurable {
    /**
     * The freeze option determines whether the object should be frozen or not.
     * - If set to true, the object and its properties will be frozen.
     * - If set to false, the object and its properties will not be frozen.
     */
    static defaultOptions = {
        freeze: true
    };
    constructor(configuration = {
        freeze: true
    }, prototype = Immuteable.prototype) {
        super({
            ...Immuteable.defaultOptions,
            ...configuration
        }, prototype);
        this.initializeImmuteable();
    }
    initializeImmuteable({ force = false } = {}) {
        if ((this.constructor.prototype === Immuteable.prototype
            && this.getOption('freeze') === true)
            || (force === true
                && this.getOption('freeze') === true)) {
            Immuteable.deepFreeze(this);
        }
    }
    static deepFreeze(object) {
        if (Immuteable.isFrozen(object) === true) {
            return object;
        }
        return Freezer.deepFreeze(object);
    }
    static isFrozen(object) {
        return Object.isFrozen(object);
    }
    static thaw(object) {
        return Freezer.thaw(object);
    }
    async gethash({ keys }) {
        const hashableObject = {};
        for (const key of keys) {
            hashableObject[key] = Object.getOwnPropertyDescriptor(this, key)?.value;
        }
        return await MultiHashUtilities.hashString(hashableObject.toString());
    }
}
export { Immuteable };
//# sourceMappingURL=immuteable.js.map