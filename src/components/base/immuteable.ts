import { Freezer } from "@utilities/freezer";
import { Configurable, ConfigurableOptions } from "@components/base/configurable";
import { MultiHashUtilities } from "@utilities/multiHash";

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
    /**
     * The freeze option determines whether the object should be frozen or not.
     * - If set to true, the object and its properties will be frozen.
     * - If set to false, the object and its properties will not be frozen.
     */
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

        this.initializeImmuteable();
    }

    public initializeImmuteable(
        {
            force = false
        }: {
            force?: boolean
        } = {}
    ): void {
        if (
            ( 
                this.constructor.prototype === Immuteable.prototype
                && this.getOption('freeze') === true
            )
            || (
                force === true
                && this.getOption('freeze') === true
            )
        ) {
            Immuteable.deepFreeze(this);
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

    public async gethash({keys}:{keys: string[]}): Promise<string> {
        const hashableObject: Record<string, any> = {};

        for (const key of keys) {
            hashableObject[key] = Object.getOwnPropertyDescriptor(this, key)?.value;
        }

        return await MultiHashUtilities.hashString(hashableObject.toString());

    }
}

export {
    type ImmuteableConfigurationOptions,
    Immuteable
}