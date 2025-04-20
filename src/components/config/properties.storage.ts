import { Parameter, ParameterEntry } from "./parameter";
import { Argument, ArgumentEntry } from "./argument";
import { BaseObjectTypes, BaseStorageLocation, BaseStorageLocations, BaseValueKey } from "@templates/v0";
import { PocketStorage } from "@components/base";
import { Metadata } from "@components/metadata";
import { Checks } from "@utilities/checks";


/**
 * Properties is a class that represents a storage object for arguments and parameters.
 * It extends the PocketStorage class and provides methods to manage the storage.
 */
class Properties<L extends BaseStorageLocation = BaseStorageLocations.MEMORY> 
    extends
        PocketStorage
        <
            Argument<any, any> | Parameter<any, any>,
            BaseObjectTypes.Argument | BaseObjectTypes.Parameter,
            L
        >
{
    constructor({
        items = [],
        location = BaseStorageLocations.MEMORY as L,
        allowDuplicates = false,
        allowEmpty = true,
        maxSize = 0
    }: {
        items?: Array<Argument<any, any> | Parameter<any, any>>;
        location?: L;
        allowDuplicates?: boolean;
        allowEmpty?: boolean;
        maxSize?: number;
    } ={}) {
        super(
            items,
            {
                location,
                allowDuplicates,
                allowEmpty,
                maxSize
            }
        );
    }

    public getArgument(name: BaseValueKey): Argument<any, any> | undefined{
        const args = this.arguments;
        const arg = args.find(arg => arg.name === name);

        return arg;
    }

    public getParameter(name: BaseValueKey): Parameter<any, any> | undefined {
        const params = this.parameters;
        const param = params.find(param => param.name === name);

        return param;
    }

    public getDefaultFromParameter(name: BaseValueKey, useOptional: boolean = false): Argument<any, any> | undefined {
        const param = this.getParameter(name);
        
        if (!param) {
            return undefined;
        }

        const metadata = param.metadata as unknown as Metadata<any, BaseObjectTypes.Argument>;
        const defultValue = param.default;
        const optionalValues = param.optional !== undefined ? param.optional : [];
        let value = Checks.isEmpty(defultValue) === false ? defultValue : null;

        if (
            useOptional === true
            && Checks.isEmpty(defultValue) === true
            && Checks.isEmpty(optionalValues) === false
            && optionalValues.length > 0
        ) {
            value = optionalValues[0];
        }

        if (
            Checks.isEmpty(defultValue) === true
            && Checks.isEmpty(optionalValues) === true
        ) {
            return undefined;
        }

        if (Checks.isEmpty(defultValue) === false) {
            return new Argument({
                name: param.name,
                value: defultValue,
                meta: {
                    ...metadata,
                    type: BaseObjectTypes.Argument
                }
            })
        }
    }

    public convertArgumentFromParameter(name: BaseValueKey): Argument<any, any> | undefined {
        const param = this.getParameter(name);
        if (!param) {
            return undefined;
        }
        const metadata = param.metadata as unknown as Metadata<any, BaseObjectTypes.Argument>;

        const defultValue = param.default;
        const optionalValues = param.optional;

        const arg = new Argument({
            name: param.name,
            value: Checks.isEmpty(param.default) === false ? param.default : null,
            meta: {
                ...metadata,
                type: BaseObjectTypes.Argument
            }
        })
    }

    public get arguments(): Array<Argument<any, any>> {
        return this.items.filter(item => item instanceof Argument) as Array<Argument<any, any>>;
    }

    public get parameters(): Array<Parameter<any, any>> {
        return this.items.filter(item => item instanceof Parameter) as Array<Parameter<any, any>>;
    }

    private get keysFromArgs(): Array<BaseValueKey> {
        return this.arguments.map(arg => arg.name);
    }

    private get keysFromParams(): Array<BaseValueKey> {
        return this.parameters.map(param => param.name);
    }

    public get requiredKeys(): Array<BaseValueKey> {
        const params = this.parameters;
        const requiredKeys: Array<BaseValueKey> = [];

        for (const param of params) {
            if (param.required) {
                requiredKeys.push(param.name);
            }
        }

        return requiredKeys;
    }

    public get missingArgs(): Array<BaseValueKey> {
        const requiredKeys = this.requiredKeys;
        const args = this.arguments;
        const missingArgs: Array<BaseValueKey> = [];

        for (const key of requiredKeys) {
            if (!args.find(arg => arg.name === key)) {
                missingArgs.push(key);
            }
        }
        return missingArgs;
    }

    public get defaultParams(): Array<Parameter<any, any>> {
        const params = this.parameters;
        const defaultParams: Array<Parameter<any, any>> = [];

        for (const param of params) {
            if (
                Checks.isEmpty(param.default) === false
                && param.default === true
            ) {
                defaultParams.push(param);
            }
        }

        return defaultParams;
    }

    public getValue(name: BaseValueKey): Argument<any, any> | undefined {
        const arg = this.getArgument(name);

        if (arg) {
            return arg;
        }

        const param = this.getParameter(name);
        if (param) {
            const metadata = param.metadata as unknown as Metadata<any, BaseObjectTypes.Argument>;
        }
    }
    
    public get values(): Array<Argument<any, any>> {
        const args = this.arguments;
        const params = this.parameters;
        const values: Array<Argument<any, any>> = [];

        for (const param of params) {
            const arg = args.find(arg => arg.name === param.name);
            if (arg) {
                values.push(arg);
            }
            else {
                const metadata = param.metadata as unknown as Metadata<any, BaseObjectTypes.Argument>;
                const value = param.default;
                values.push(new Argument({
                    name: param.name,
                    value: param.default !== undefined
                        ? param.default
                        : param.optional && param.optional.length > 0
                            ? param.optional[0] 
                            : null, 
                    meta: {
                        ...metadata,
                        type: BaseObjectTypes.Argument
                    }
                } as ArgumentEntry<any, any>));
            }
        }

        return values;
    }

}

export {
    Properties
}