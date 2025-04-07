import { BaseMetadata } from "./metadata";
import { BaseValue } from "./value";



interface BaseArgument<T> {
    name: string;
    value: T | BaseValue;
}


interface BaseParameter<T> {
    name: string;
    description: string;
    type: string;
    default?: T | BaseValue;
    required?: boolean;
    metadata?: BaseMetadata;
}


interface BaseConfiguration<T> {
    name: string;
    description?: string;
    type?: string;
    parameters?: BaseParameter<T>[];
    metadata?: BaseMetadata;
}


export {
    type BaseArgument,
    type BaseParameter,
    type BaseConfiguration
}



