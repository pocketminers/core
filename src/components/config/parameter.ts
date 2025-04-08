import { BaseValueKey } from "@templates/v0/base/value";

class BaseParameter<T> {
    public readonly name: BaseValueKey;
    default: any;
    description: string;
    required: boolean;
    
    constructor(name: string, type: string, defaultValue: any, description: string, required: boolean) {
        this.name = name;
        this.type = type;
        this.defaultValue = defaultValue;
        this.description = description;
        this.required = required;
    }
}