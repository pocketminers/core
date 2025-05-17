import { BaseCommands } from "./command.js";
import { BaseParameters } from "./configuration.js";
import { BaseIdentifiableComponent, BaseIdentifiableObject, BaseIdentifierFormat, BaseIdentifierFormats } from "./identifier.js";
import { BaseObjects } from "./object.js";
import { BaseInstance } from "./process.js";
import { BaseJobStatuses } from "./statuses.js";
/**
 * BaseJobInterface is a generic type that represents a job interface.
 * - It includes the identifier, commands, instance, status, and timestamps.
 *
 * @template I - The type of the identifier, which extends BaseIdentifierFormat.
 * @template P - The type of the parameters, which extends BaseParameters.
 * @template R - The type of the return value. It can be any type.
 * @template T - The type of the instance. It extends BaseInstance.
 */
interface BaseJobInterface<I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID, P extends BaseParameters = [], R = any, T extends BaseInstance<R> = BaseInstance<R>> extends BaseIdentifiableComponent<{
    commands: BaseCommands<P>;
    instance: T;
    status: BaseJobStatuses.CREATED;
    updatedAt?: Date;
    startedAt?: Date;
    finishedAt?: Date;
}, I> {
}
/**
 * BaseJobInterface is a generic type that represents a job interface.
 * - It includes the identifier, commands, instance, status, and timestamps.
 *
 * @template I - The type of the identifier, which extends BaseIdentifierFormat.
 * @template P - The type of the parameters, which extends BaseParameters.
 * @template R - The type of the return value. It can be any type.
 * @template T - The type of the instance. It extends BaseInstance.
 */
interface BaseJobObjectInterface<I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID, P extends BaseParameters = [], R = any, T extends BaseInstance<R> = BaseInstance<R>> extends BaseIdentifiableObject<{
    commands: BaseCommands<P>;
    instance: T;
    status: BaseJobStatuses.CREATED;
    updatedAt?: Date;
    startedAt?: Date;
    finishedAt?: Date;
}, I, BaseObjects.Job, P> {
}
export { type BaseJobInterface, type BaseJobObjectInterface, };
//# sourceMappingURL=job.d.ts.map