import { BaseArgument } from "@templates/v0/base/configuration";
import { BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";


/**
 * BaseArgument is a generic class that represents a key-value pair.
 */
class Argument<T>
    implements
        BaseArgument<T>
{
    public readonly data: {
        name: BaseValueKey;
        value: BaseValue<T>;
    }

    constructor({
        name,
        value,
    }: {
        name: BaseValueKey,
        value: BaseValue<T>
    }){
        this.data = {
            name,
            value
        };
        this.metadata = {
            description: "",
            default: value,
            required: false,
            optional: []
        };

        Object.freeze(this);
        Object.freeze(this.data);
        Object.freeze(this.data.data.name);
    }

    toString(): string {
        return `${String(this.name)}: ${this.value  instanceof Object ? JSON.stringify(this.value) : this.value}`;
    }

    toKeyValuePair(): Array<[BaseValueKey, BaseValue<T>]> {
        return [[this.name, this.value]];
    }

    toRecord(): Record<BaseValueKey, BaseValue<T>> {
        return {
            [this.name]: this.value
        };
    }
}


export {
    BaseArgument
}