import { Freezer } from "@utilities/freezer";
import { Configurable, ConfigurableOptions } from "@components/base/configurable";

/**
 * ImmuteableConfigurationOptions is an interface that defines the options for the Immuteable class.
 */
interface ImmuteableConfigurationOptions
    extends
        ConfigurableOptions,
        Record<'freeze', boolean>
{}


/**
 * The Immuteable class is a base class that provides immutability to its instances.
 * - It uses the Freezer utility to deep freeze the object and its properties.
 * - This ensures that the object cannot be modified after it has been created.
 */
class Immuteable
    extends
        Configurable
{
    public static readonly defaultOptions: ImmuteableConfigurationOptions = {
        freeze: true
    };

    public constructor(
        configuration: ImmuteableConfigurationOptions = {
            freeze: true
        },
        prototype: any = Immuteable.prototype
    ) {
        super({
            ...Immuteable.defaultOptions,
            ...configuration
        },
            prototype
        );

        this.initializeImmuteable(prototype);
    }

    public initializeImmuteable(overridePrototype?: any): void {
        if (
            overridePrototype !== undefined
            && overridePrototype !== null
            && ( 
                overridePrototype === Immuteable.prototype
            )
        ) {
            if (this.getOption('freeze') === true) {
                Immuteable.deepFreeze(this);
            }
        }
        else if (
            overridePrototype === undefined
        ) {
            // Override the prototype with the provided one
            if (this.getOption('freeze') === true) {
                Immuteable.deepFreeze(this);
            }
        }
    }

    public static deepFreeze<T>(object: T): T {
        if (Immuteable.isFrozen(object) === true) {
            return object;
        }

        return Freezer.deepFreeze(object);
    }

    public static isFrozen<T>(object: T): boolean {
        return Object.isFrozen(object);
    }

    public static thaw<T>(object: T): T {
        return Freezer.thaw(object);
    }
}

export {
    type ImmuteableConfigurationOptions,
    Immuteable
}