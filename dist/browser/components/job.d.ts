import { BaseJobInterface } from "@templates/v0";
import { BaseCommands, BaseParameters, BaseIdentifierFormat, BaseIdentifierFormats, BaseInstance, BaseJobStatuses } from "@templates/v0";
import { PocketIdentity } from "./identity";
declare class PocketJob<I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID, P extends BaseParameters = [], R = any, T extends BaseInstance<R> = BaseInstance<R>> implements BaseJobInterface<I, P, R, T> {
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
    };
    constructor({ id, name, description, parameters, createdAt, commands, instance, status, updatedAt, startedAt, finishedAt }: {
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
    });
}
export { PocketJob };
//# sourceMappingURL=job.d.ts.map