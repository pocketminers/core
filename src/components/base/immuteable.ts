import { BaseValue, BaseValueKey } from "@templates/v0";
import { Freezer } from "@utilities/freezer";
import { Configurable, ConfigurableOptions } from "./configurable";

interface ImmuteableConfigurationOptions
    extends
        ConfigurableOptions,
        Record<'freeze', boolean>
{}


/**
 * The Immuteable class is a base class that provides immutability to its instances.
 * It uses the Freezer utility to deep freeze the object and its properties.
 * This ensures that the object cannot be modified after it has been created.
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
        prototype: any = Object.getPrototypeOf(Immuteable.prototype)
    ) {
        super({
            ...Immuteable.defaultOptions,
            ...configuration
        },
            prototype
        );
    }

    public static deepFreeze<T>(object: T): T {
        if (Immuteable.isFrozen(object)) {
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
    Immuteable
}