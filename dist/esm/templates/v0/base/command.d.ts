import { BaseParameters } from "./configuration.js";
import { BaseInstance } from "./process.js";
import { BaseValue, BaseValueKey } from "./value.js";
/**
 * BaseCommandRunner is a generic type that represents a command runner function.
 * - It takes arguments and an instance as parameters and returns a promise of type R.
 *
 * @template R - The type of the return value. It can be any type.
 * @template T - The type of the instance. It extends BaseInstance.
 *
 * @example
 * const commandRunner: BaseCommandRunner<string> = async (args, instance) => {
 *   // Implementation of the command runner
 *   return "Command executed successfully";
 * };
 */
type BaseCommandRunner<R = any, T extends BaseInstance = BaseInstance<R>> = (args: Record<BaseValueKey, BaseValue>, instance: T) => Promise<R>;
/**
 * BaseCommand is a generic type that represents a command.
 * - It contains the command name, description, parameters, and a runner function.
 *
 * @template R - The type of the return value. It can be any type.
 * @template T - The type of the instance. It extends BaseInstance.
 *
 * @example
 * const command: BaseCommand<string> = {
 *   name: "command1",
 *   description: "This is a command",
 *   parameters: [
 *     { name: "param1", value: "value1" }
 *   ],
 *   run: async (args, instance) => {
 *     // Implementation of the command runner
 *     return "Command executed successfully";
 *   }
 * };
 */
interface BaseCommand<R = any, T extends BaseInstance = BaseInstance<R>> {
    /**
     * The command name.
     */
    name: BaseValueKey;
    /**
     * The command description.
     */
    description: string;
    /**
     * The command parameters.
     */
    parameters: BaseParameters;
    /**
     * The command runner.
     */
    run: BaseCommandRunner<R, T>;
}
/**
 * BaseCommands is a generic type that represents an array of commands.
 * - It extends the Array type with BaseCommand.
 *
 * @template T - The type of the command arguments. It can be any type.
 *
 * @example
 * const commands: BaseCommands = [
 *   {
 *     name: "command1",
 *     description: "This is command 1",
 *     parameters: [],
 *     run: async (args, instance) => {
 *       // Implementation of the command runner
 *       return "Command 1 executed successfully";
 *     }
 *   },
 *   {
 *     name: "command2",
 *     description: "This is command 2",
 *     parameters: [],
 *     run: async (args, instance) => {
 *       // Implementation of the command runner
 *       return "Command 2 executed successfully";
 *     }
 *   }
 * ];
 */
interface BaseCommands<T = any[]> extends Array<BaseCommand<T>> {
}
export { type BaseCommandRunner, type BaseCommand, type BaseCommands };
//# sourceMappingURL=command.d.ts.map