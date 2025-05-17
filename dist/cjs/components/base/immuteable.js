"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Immuteable = void 0;
const freezer_1 = require("../../utilities/freezer.js");
const configurable_1 = require("../base/configurable.js");
const multiHash_1 = require("../../utilities/multiHash.js");
/**
 * The Immuteable class is a base class that provides immutability to its instances.
 * - It uses the Freezer utility to deep freeze the object and its properties.
 * - This ensures that the object cannot be modified after it has been created.
 */
class Immuteable extends configurable_1.Configurable {
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
        return freezer_1.Freezer.deepFreeze(object);
    }
    static isFrozen(object) {
        return Object.isFrozen(object);
    }
    static thaw(object) {
        return freezer_1.Freezer.thaw(object);
    }
    async gethash({ keys }) {
        const hashableObject = {};
        for (const key of keys) {
            hashableObject[key] = Object.getOwnPropertyDescriptor(this, key)?.value;
        }
        return await multiHash_1.MultiHashUtilities.hashString(hashableObject.toString());
    }
}
exports.Immuteable = Immuteable;
//# sourceMappingURL=immuteable.js.map