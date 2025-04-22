import { BaseMessageCodes, BaseMessageLevels, BaseSuccessCodes } from "../../templates/v0/base/message.js";
/**
 * PocketMessage is a class that represents a message with a code, level, body, timestamp, and optional data.
 * - It is used to encapsulate messages in the Pocket framework.
 * - The class is generic and can be used with different types of codes, levels, body, and data.
 * - This class also ensures that the message object is immutable after creation.
 * - This class does not extend the PocketObject class, as it does not include a metadata object.
 */
declare class PocketMessage<C extends BaseMessageCodes = BaseSuccessCodes.OK, L extends BaseMessageLevels = BaseMessageLevels.SUCCESS, B = any, D = any> {
    code: C;
    level: L;
    body: B;
    timestamp: Date;
    data?: D;
    callback?: (message?: PocketMessage<C, L, B, D>) => Promise<void>;
    constructor({ code, level, body, timestamp, data, printToConsole, callback }: {
        code?: C;
        level?: L;
        body?: B;
        timestamp?: Date;
        data?: D;
        printToConsole?: boolean;
        callback?: (message?: PocketMessage<C, L, B, D>) => Promise<void>;
    });
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
        timestamp: Date;
        data?: D;
    };
}
export { PocketMessage };
//# sourceMappingURL=message.d.ts.map