import { BaseJobInterface } from "@templates/v0";
import {
    BaseCommands,
    BaseParameters,
    BaseIdentifiableObject,
    BaseIdentifierFormat,
    BaseIdentifierFormats,
    BaseObjects,
    BaseInstance,
    BaseJobStatuses,
} from "@templates/v0";
import { PocketIdentity } from "./identity";

class PocketJob
<
    I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID,
    P extends BaseParameters = [],
    R = any,
    T extends BaseInstance<R> = BaseInstance<R>
>
    implements BaseJobInterface<I, P, R, T> 
{
    data: {
        id: PocketIdentity<I>;
        name?: BaseIdentifierFormats.Name;
        description?: string;
        parameters?: BaseParameters<P>;
        createdAt: Date;
        commands?: BaseCommands<P>;
        instance?: T;
        status?: BaseJobStatuses.CREATED;
        updatedAt?: Date;
        startedAt?: Date;
        finishedAt?: Date;
    }

    constructor({
        id,
        name,
        description,
        parameters,
        createdAt,
        commands,
        instance,
        status,
        updatedAt,
        startedAt,
        finishedAt
    }: {
        id: PocketIdentity<I>;
        name?: BaseIdentifierFormats.Name;
        description?: string;
        parameters?: BaseParameters<P>;
        createdAt: Date;
        commands?: BaseCommands<P>;
        instance?: T;
        status?: BaseJobStatuses.CREATED;
        updatedAt?: Date;
        startedAt?: Date;
        finishedAt?: Date;
    }) {
        this.data = {
            id: id,
            name: name,
            description: description,
            parameters: parameters,
            createdAt: createdAt,
            commands: commands,
            instance: instance,
            status: status,
            updatedAt: updatedAt,
            startedAt: startedAt,
            finishedAt: finishedAt
        };
       
    }
}

export { PocketJob };