import { BaseCommands } from "./command";
import { BaseConfiguration } from "./configuration";
import { BaseValue, BaseValueKey } from "./value";
/**
 * BaseInstance is a generic type that represents an instance of a process.
 * - It takes arguments and returns a promise of type R.
 *
 * @template R - The type of the return value. It can be any type.
 *
 * @example
 * const instance: BaseInstance<string> = async (args: Record<BaseValueKey, BaseValue>) => {
 *   // Implementation of the instance
 *   return "Instance executed successfully";
 * };
 */
type BaseInstance<R = any> = (args: Record<BaseValueKey, BaseValue>) => Promise<R>;
/**
 * BaseProcess is a generic type that represents a process.
 * - It contains an instance, configuration, and commands.
 *
 * @template T - The type of the instance. It extends BaseInstance.
 *
 * @example
 * const process: BaseProcess<string> = {
 *   instance: async (args) => {
 *     // Implementation of the instance
 *     return "Process executed successfully";
 *   },
 *   configuration: {
 *     arguments: [],
 *     parameters: []
 *   },
 *   commands: []
 * };
 */
interface BaseProcess<T extends BaseInstance> extends Record<'instance', T>, Record<'configuration', BaseConfiguration>, Record<'commands', BaseCommands<[T]>> {
}
export { type BaseProcess, type BaseInstance };
//# sourceMappingURL=process.d.ts.map