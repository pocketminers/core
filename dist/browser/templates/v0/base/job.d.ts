import { BaseCommands } from "./command.js";
import { BaseParameters } from "./configuration.js";
import { BaseIdentifiableObject, BaseIdentifierFormat, BaseIdentifierFormats } from "./identifier.js";
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
interface BaseJobInterface<I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID, P extends BaseParameters = [], R = any, T extends BaseInstance<R> = BaseInstance<R>> extends BaseIdentifiableObject<I, BaseObjects.Job, P>, Partial<Record<'commands', BaseCommands<P>>>, Partial<Record<'instance', T>>, Partial<Record<'status', BaseJobStatuses.CREATED>>, Partial<Record<'updatedAt', Date>>, Partial<Record<'startedAt', Date>>, Partial<Record<'finishedAt', Date>> {
}
export { type BaseJobInterface };
//# sourceMappingURL=job.d.ts.map