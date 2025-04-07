import { BaseValue } from "@templates/v0/base/value";

class BaseArgument<T> {
    name: string;
    value: T | BaseValue;

    constructor({
        name,
        value
    }: {
        name: string,
        value: T | BaseValue
    }){
        this.name = name;
        this.value = value;
    }
}