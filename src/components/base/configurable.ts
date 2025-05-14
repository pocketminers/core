import { BaseValue, BaseValueKey } from "@templates/v0";

interface ConfigurableOptions
    extends
        Record<BaseValueKey, BaseValue<any>>
{}


class Configurable {
    public static readonly defaultOptions: ConfigurableOptions = {};

    private configuration: ConfigurableOptions; 

    public constructor(
        configuration: ConfigurableOptions = {},
        prototype: any = Object.getPrototypeOf(Configurable.prototype)
    ) {
        this.configuration = {
            ...Configurable.defaultOptions,
            ...configuration
        };

        this.initializeConfigurable(prototype);
    }

    public initializeConfigurable(overridePrototype?: any): void {
        if (overridePrototype === undefined) {
            overridePrototype = Object.getPrototypeOf(this);
        }
        // Override the prototype with the provided one
        Object.setPrototypeOf(this, overridePrototype);
        // Initialization logic can be added here if needed
    }

    public addOption(
        key: BaseValueKey,
        value: BaseValue<any>
    ): Configurable {
        this.configuration[key] = value;
        return this;
    }

    public getOption(
        key: BaseValueKey
    ): BaseValue<any> {
        return this.configuration[key];
    }

    public getOptions(): ConfigurableOptions {
        return this.configuration;
    }

    public setOptions(
        options: ConfigurableOptions
    ): Configurable {
        this.configuration = {
            ...this.configuration,
            ...options
        };
        return this;
    }

    public removeOption(
        key: BaseValueKey
    ): Configurable {
        delete this.configuration[key];
        return this;
    }

    public hasOption(
        key: BaseValueKey
    ): boolean {
        return this.configuration.hasOwnProperty(key);
    }

    public clearOptions(): Configurable {
        this.configuration = {};
        return this;
    }

    public isEmpty(): boolean {
        return Object.keys(this.configuration).length === 0;
    }

    public toJSON(): string {
        return JSON.stringify(this.configuration);
    }

    public toString(): string {
        return JSON.stringify(this.configuration, null, 2);
    }

    public static fromJSON(
        json: string
    ): Configurable {
        return new Configurable(JSON.parse(json));
    }

    public static fromString(
        str: string
    ): Configurable {
        return new Configurable(JSON.parse(str) as ConfigurableOptions);
    }

    public static fromRecords(
        records: Record<string, BaseValue<any>>[]
    ): Configurable {
        const options: ConfigurableOptions = {};
        for (const record of records) {
            for (const key in record) {
                options[key] = record[key];
            }
        }
        return new Configurable(options);
    }
}



export {
    type ConfigurableOptions,
    Configurable
}