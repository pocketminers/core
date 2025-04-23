import { BaseParameterEntry, BaseValue, BaseValueKey } from "@templates/v0";
import { Checks } from "@utilities/checks";
import { Freezer } from "@utilities/freezer";


class PocketParameter
<
    T = any
>
    implements
        BaseParameterEntry<T>
{
    public readonly name: BaseValueKey;
    public readonly description: string;
    public readonly default?: BaseValue<T>;
    public readonly required: boolean;
    public readonly options: BaseValue<T>[];

    public constructor({
        name,
        description = "",
        default: defaultValue = undefined,
        required = false,
        options = []
    }: {
        name: BaseValueKey;
        description?: string;
        default?: BaseValue<T>;
        required?: boolean;
        options?: BaseValue<T>[];
    }) {
        if (Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }

        this.name = name;
        this.description = description;
        this.default = defaultValue;
        this.required = required;
        this.options = options;

        Freezer.deepFreeze(this);
    }

    public get nameString(): string {
        return String(this.name);
    }

    public checkValue(
        value: BaseValue<T> | undefined
    ): boolean {
        if (
            this.required == true
            && Checks.isEmpty(value) == true
        ) {
            throw new Error(`Parameter ${this.nameString} is required`);
        }

        if (
            this.options.length > 0
            && Checks.isEmpty(value) == false
            && Checks.isEmpty(this.options) == false
            && Checks.isEmpty(this.options.find((option) => option == value)) == true
            && !this.options.includes(value as BaseValue<T>)
            && !this.default == value
        ) {
            throw new Error(`Parameter ${this.nameString} must be one of ${this.options.join(", ")} or ${this.default}, but got ${value}`);
        }

        return true;
    }

    public getValueOrDefault(
        value: BaseValue<T> | undefined
    ): BaseValue<T> | undefined {
        if (
            Checks.isEmpty(value) == true
            && this.checkValue(value) == false
            && Checks.isEmpty(this.default) == false
        ) {
            return this.default;
        }

        return value;
    }

    public getValueOrDefaultOrOptions(
        value: BaseValue<T> | undefined
    ): BaseValue<T> | undefined {
        let result: BaseValue<T> | undefined = value;

        result = this.getValueOrDefault(value);

        if (
            Checks.isEmpty(result) == true
            && Checks.isEmpty(this.options) == false
        ) {
            result = this.options[0];
        }
        return result;
    }
        
}

export {
    PocketParameter
}