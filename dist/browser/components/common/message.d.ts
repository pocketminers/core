import { BaseSuccessCodes } from "../../templates/v0/base/statuses.js";
import { BaseMessageCodes, BaseMessageLevel, BaseMessageLevels } from "../../templates/v0/base/message.js";
import { PocketTimestamp } from "../base/timestamp.js";
import { Immuteable, ImmuteableConfigurationOptions } from "../base/index.js";
interface PocketMessageConfigurationOptions extends ImmuteableConfigurationOptions, Record<'printToConsole', boolean>, Partial<Record<'callback', (message?: PocketMessage) => Promise<void>>>, Record<'delayCallback', number> {
}
interface PocketMessageEntry<C extends BaseMessageCodes = BaseSuccessCodes.OK, L extends BaseMessageLevel = BaseMessageLevels.SUCCESS, B = any, D = any> extends Partial<Record<'code', C>>, Partial<Record<'level', L>>, Partial<Record<'body', B>>, Partial<Record<'data', D>>, Partial<Record<'timestamp', PocketTimestamp>>, Partial<Record<'configuration', PocketMessageConfigurationOptions>> {
}
/**
 * PocketMessage is a class that represents a message with a code, level, body, timestamp, and optional data.
 * - It is used to encapsulate messages in the Pocket framework.
 * - The class is generic and can be used with different types of codes, levels, body, and data.
 * - This class also ensures that the message object is immutable after creation.
 * - This class does not extend the PocketObject class, as it does not include a metadata object.
 *
 * @template C - The message code. Defaults to BaseSuccessCodes.OK.
 * @template L - The message level. Defaults to BaseMessageLevels.SUCCESS.
 * @template B - The type of the message body. Defaults to any.
 * @template D - The type of the message data. Defaults to any.
 *
 * @example
 * const message = new PocketMessage({
 *    code: BaseSuccessCodes.OK,
 *    level: BaseMessageLevels.SUCCESS,
 *    body: "Operation completed successfully",
 *    timestamp: new PocketTimestamp(new Date()),
 *    data: { id: 1 },
 *    configuration: {
 *        printToConsole: true,
 *        callback: async (message) => {
 *            console.log("Callback executed:", message);
 *        },
 *        delayCallback: 1000
 *    }
 * });
 */
declare class PocketMessage<C extends BaseMessageCodes = BaseSuccessCodes.OK, L extends BaseMessageLevel = BaseMessageLevels.SUCCESS, B = any, D = any> extends Immuteable {
    readonly code: C;
    readonly level: L;
    readonly body: B;
    readonly timestamp: PocketTimestamp;
    readonly data?: D;
    readonly callback?: (message?: any) => Promise<void>;
    static readonly defaultOptions: PocketMessageConfigurationOptions;
    constructor({ code, level, body, timestamp, data, configuration: { printToConsole, callback, delayCallback, freeze } }: PocketMessageEntry<C, L, B, D>);
    private getLevelFromCode;
    private checkCodeAndLevel;
    /**
     * Sets the callback function to be called when the message is created.
     * @param callback - The callback function to be called.
     */
    handleCallback(): Promise<void>;
    /**
     * Sets the printToConsole property to true or false.
     * @param printToConsole - Whether to print the message to the console.
     */
    private handlePrintToConsole;
    /**
     * Prints the message to the console based on its level.
     * - INFO: console.info
     * - SUCCESS: console.log
     * - WARNING: console.warn
     * - ERROR: console.error
     * - CRITICAL: console.error
     * - DEBUG: console.debug
     * - TRACE: console.trace
     */
    private printMessage;
    /**
     * Returns a string representation of the PocketMessage instance.
     * @returns A string representation of the PocketMessage instance.
     */
    toString(): string;
    /**
     * Converts the PocketMessage instance to a JSON string.
     * @returns A JSON string representation of the PocketMessage instance.
     */
    toJSON(): string;
    /**
     * Converts the PocketMessage instance to a plain object.
     * @returns A plain object representation of the PocketMessage instance.
     */
    toObject(): {
        code: C;
        level: L;
        body: B;
        timestamp: PocketTimestamp;
        data?: D;
    };
}
export { type PocketMessageEntry, type PocketMessageConfigurationOptions, PocketMessage };
//# sourceMappingURL=message.d.ts.map