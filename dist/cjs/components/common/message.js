"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketMessage = void 0;
const statuses_1 = require("../../templates/v0/base/statuses.js");
const message_1 = require("../../templates/v0/base/message.js");
const timestamp_1 = require("../base/timestamp.js");
const base_1 = require("../base/index.js");
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
class PocketMessage extends base_1.Immuteable {
    code;
    level;
    body;
    timestamp;
    data;
    callback;
    static defaultOptions = {
        printToConsole: false,
        callback: undefined,
        delayCallback: 0,
        freeze: true
    };
    constructor({ code, level, body, timestamp, data, configuration: { printToConsole, callback, delayCallback, freeze } = {
        printToConsole: false,
        callback: undefined,
        delayCallback: 0,
        freeze: true
    } }) {
        super({
            printToConsole: printToConsole !== undefined ? printToConsole : PocketMessage.defaultOptions.printToConsole,
            callback: callback !== undefined ? callback : PocketMessage.defaultOptions.callback,
            delayCallback: delayCallback !== undefined ? delayCallback : PocketMessage.defaultOptions.delayCallback,
            freeze: freeze !== undefined ? freeze : PocketMessage.defaultOptions.freeze
        }, PocketMessage.prototype);
        this.code = code !== undefined ? code : statuses_1.BaseSuccessCodes.OK;
        const expectedLevel = this.getLevelFromCode(this.code);
        this.level = level !== undefined ? level : expectedLevel;
        // this.checkCodeAndLevel(this.code, this.level);
        this.body = body !== undefined ? body : {};
        this.timestamp = timestamp !== undefined ? timestamp : new timestamp_1.PocketTimestamp(new Date());
        this.data = data !== undefined ? data : {};
        this.callback = callback;
        this.initializeImmuteable({
            force: freeze !== undefined ? freeze : PocketMessage.defaultOptions.freeze
        });
        this.handlePrintToConsole(printToConsole);
        // If a delayCallback is provided, set a timeout to call the callback
        // after the specified delay
        if (delayCallback > 0
            && this.callback !== undefined
            && typeof this.callback === "function") {
            setTimeout(() => {
                this.handleCallback().then(() => {
                    null;
                }).catch((error) => {
                    console.error("Error executing callback:", error);
                });
            }, delayCallback); // Convert seconds to milliseconds
        }
        else if (delayCallback === 0
            && this.callback !== undefined
            && typeof this.callback === "function") {
            // If no delayCallback is provided, call the callback immediately
            this.handleCallback().then(() => {
                null;
            }).catch((error) => {
                console.error("Error executing callback:", error);
            });
        }
        else if (delayCallback === -1
            && this.callback !== undefined) {
            // If no callback is provided, do nothing
            console.log("Callback delayed indefinitely");
        }
    }
    getLevelFromCode(code) {
        const startsWith = code.toString().charAt(0);
        switch (Number(startsWith)) {
            case 1:
                return message_1.BaseMessageLevels.INFO;
            case 2:
                return message_1.BaseMessageLevels.SUCCESS;
            case 3:
                return message_1.BaseMessageLevels.WARNING;
            case 4:
            case 5:
                return message_1.BaseMessageLevels.ERROR;
            default:
                return message_1.BaseMessageLevels.INFO;
        }
    }
    checkCodeAndLevel(code, level) {
        if (!Object.values(message_1.BaseMessageLevels).includes(level)) {
            throw new Error(`Invalid level: ${level}`);
        }
        // switch (level) {
        //     case BaseMessageLevels.INFO:
        //         if (!Object.values(BaseInfoCodes).includes(code as BaseInfoCodes)) {
        //             throw new Error(`Invalid code for INFO level: ${code}`);
        //         }
        //         break;
        //     case BaseMessageLevels.SUCCESS:
        //         if (!Object.values(BaseSuccessCodes).includes(code as BaseSuccessCodes)) {
        //             throw new Error(`Invalid code for SUCCESS level: ${code}`);
        //         }
        //         break;
        //     case BaseMessageLevels.WARNING:
        //         if (!Object.values(BaseWarningCodes).includes(code as BaseWarningCodes)) {
        //             throw new Error(`Invalid code for WARNING level: ${code}`);
        //         }
        //         break;
        //     case BaseMessageLevels.ERROR:
        //         if (
        //             !Object.values(BaseClientErrorCodes).includes(code as BaseClientErrorCodes) &&
        //             !Object.values(BaseServerErrorCodes).includes(code as BaseServerErrorCodes)
        //         ) {
        //             throw new Error(`Invalid code for ERROR level: ${code}`);
        //         }
        //         break;
        //     default:
        //         throw new Error(`Invalid level: ${level}`);
        // }
    }
    /**
     * Sets the callback function to be called when the message is created.
     * @param callback - The callback function to be called.
     */
    async handleCallback() {
        try {
            if (this.callback !== undefined) {
                await this.callback(this);
            }
        }
        catch (error) {
            console.error("Error executing callback:", error);
        }
    }
    /**
     * Sets the printToConsole property to true or false.
     * @param printToConsole - Whether to print the message to the console.
     */
    handlePrintToConsole(printToConsole) {
        if (printToConsole !== undefined
            && printToConsole === true) {
            this.printMessage();
        }
    }
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
    printMessage() {
        switch (this.level) {
            case message_1.BaseMessageLevels.INFO:
                console.info(this.body);
                break;
            case message_1.BaseMessageLevels.SUCCESS:
                console.log(this.body);
                break;
            case message_1.BaseMessageLevels.WARNING:
                console.warn(this.body);
                break;
            case message_1.BaseMessageLevels.CRITICAL:
            case message_1.BaseMessageLevels.ERROR:
                console.error(this.body);
                break;
            case message_1.BaseMessageLevels.DEBUG:
                console.debug(this.body);
                break;
            case message_1.BaseMessageLevels.TRACE:
                console.trace(this.body);
                break;
            default:
                console.log(this.body);
                break;
        }
    }
    /**
     * Returns a string representation of the PocketMessage instance.
     * @returns A string representation of the PocketMessage instance.
     */
    toString() {
        return `PocketMessage { code: ${this.code}, level: ${this.level}, body: ${this.body}, timestamp: ${this.timestamp}, data: ${this.data} }`;
    }
    /**
     * Converts the PocketMessage instance to a JSON string.
     * @returns A JSON string representation of the PocketMessage instance.
     */
    toJSON() {
        return JSON.stringify({
            code: this.code,
            level: this.level,
            body: this.body,
            timestamp: this.timestamp,
            data: this.data
        });
    }
    /**
     * Converts the PocketMessage instance to a plain object.
     * @returns A plain object representation of the PocketMessage instance.
     */
    toObject() {
        return {
            code: this.code,
            level: this.level,
            body: this.body,
            timestamp: this.timestamp,
            data: this.data
        };
    }
}
exports.PocketMessage = PocketMessage;
//# sourceMappingURL=message.js.map