import { BaseSuccessCodes } from "@templates/v0/base/statuses";
import { BaseMessageCode, BaseMessageCodes, BaseMessageLevel, BaseMessageLevels } from "@templates/v0/base/message";
import { Freezer } from "@utilities/freezer";
import { PocketTimestamp } from "@components/base/timestamp";
import { Immuteable, ImmuteableConfigurationOptions } from "@components/base";


interface PocketMessageConfigurationOptions
    extends
        ImmuteableConfigurationOptions,
        Record<'printToConsole', boolean>,
        Partial<Record<'callback', (message?: PocketMessage) => Promise<void>>>,
        Record<'delayCallback', number>
{}


interface PocketMessageEntry
<
    C extends BaseMessageCodes = BaseSuccessCodes.OK,
    L extends BaseMessageLevel = BaseMessageLevels.SUCCESS,
    B = any,
    D = any,
>
    extends
        Partial<Record<'code', C>>,
        Partial<Record<'level', L>>,
        Partial<Record<'body', B>>,
        Partial<Record<'data', D>>,
        Partial<Record<'timestamp', PocketTimestamp>>,
        Partial<Record<'configuration', PocketMessageConfigurationOptions>>
{}


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
class PocketMessage
<
    C extends BaseMessageCodes = BaseSuccessCodes.OK,
    L extends BaseMessageLevel = BaseMessageLevels.SUCCESS,
    B = any,
    D = any,
>
    extends
        Immuteable
{
    public readonly code: C;
    public readonly level: L;
    public readonly body: B;
    public readonly timestamp: PocketTimestamp;
    public readonly data?: D;
    public readonly callback?: (message?: any) => Promise<void>;

    public static readonly defaultOptions: PocketMessageConfigurationOptions = {
        printToConsole: false,
        callback: undefined,
        delayCallback: 0,
        freeze: true
    };

    constructor({
        code,
        level,
        body,
        timestamp,
        data,
        configuration: {
            printToConsole,
            callback,
            delayCallback,
            freeze
        } = {
            printToConsole: false,
            callback: undefined,
            delayCallback: 0,
            freeze: true
        }
    }: PocketMessageEntry<C, L, B, D>) {

        super(
            {
                printToConsole: printToConsole !== undefined ? printToConsole : PocketMessage.defaultOptions.printToConsole,
                callback: callback !== undefined ? callback : PocketMessage.defaultOptions.callback,
                delayCallback: delayCallback !== undefined ? delayCallback : PocketMessage.defaultOptions.delayCallback,
                freeze : freeze !== undefined ? freeze : PocketMessage.defaultOptions.freeze
            },
            PocketMessage.prototype
        )

        this.code = code !== undefined ? code : BaseSuccessCodes.OK as C;
        const expectedLevel = this.getLevelFromCode(this.code);
        this.level = level !== undefined ? level : expectedLevel as L;
        // this.checkCodeAndLevel(this.code, this.level);

        this.body = body !== undefined ? body : {} as B;
        this.timestamp = timestamp !== undefined ? timestamp : new PocketTimestamp(new Date());
        this.data = data !== undefined ? data : {} as D;
        this.callback = callback;

        this.initializeImmuteable({
            force: freeze !== undefined ? freeze : PocketMessage.defaultOptions.freeze
        });


        this.handlePrintToConsole(printToConsole);


        // If a delayCallback is provided, set a timeout to call the callback
        // after the specified delay
        if (
            delayCallback > 0
            && this.callback !== undefined
            && typeof this.callback === "function"
        ) {
            setTimeout(() => {
                this.handleCallback().then(() => {
                    null;
                }
                ).catch((error) => {
                    console.error("Error executing callback:", error);
                });
            }, delayCallback); // Convert seconds to milliseconds
        }
        else if (
            delayCallback === 0
            && this.callback !== undefined
            && typeof this.callback === "function"
        ) {
            // If no delayCallback is provided, call the callback immediately
            this.handleCallback().then(() => {
                null;
            }
            ).catch((error) => {
                console.error("Error executing callback:", error);
            });
        }
        else if (
            delayCallback === -1
            && this.callback !== undefined
        ) {
            // If no callback is provided, do nothing
            console.log("Callback delayed indefinitely");
        }
        
    }

    private getLevelFromCode(code: C): L {
        const startsWith = code.toString().charAt(0);
        switch (Number(startsWith)) {
            case 1:
                return BaseMessageLevels.INFO as L;
            case 2:
                return BaseMessageLevels.SUCCESS as L;
            case 3:
                return BaseMessageLevels.WARNING as L;
            case 4:
            case 5:
                return BaseMessageLevels.ERROR as L;
            default:
                return BaseMessageLevels.INFO as L;
        }
    }

    private checkCodeAndLevel(code: C, level: L): void {
        if (
            !Object.values(BaseMessageLevels).includes(level as BaseMessageLevels)
        ) {
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
    public async handleCallback(): Promise<void> {
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
    private handlePrintToConsole(printToConsole?: boolean): void {
        if (
            printToConsole !== undefined
            && printToConsole === true
        ) {
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
    private printMessage(): void {
        switch (this.level) {
            case BaseMessageLevels.INFO:
                console.info(this.body);
                break;

            case BaseMessageLevels.SUCCESS:
                console.log(this.body);
                break;

            case BaseMessageLevels.WARNING:
                console.warn(this.body);
                break;

            case BaseMessageLevels.CRITICAL:
            case BaseMessageLevels.ERROR:
                console.error(this.body);
                break;

            case BaseMessageLevels.DEBUG:
                console.debug(this.body);
                break;
 
            case BaseMessageLevels.TRACE:
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
    public toString(): string {
        return `PocketMessage { code: ${this.code}, level: ${this.level}, body: ${this.body}, timestamp: ${this.timestamp}, data: ${this.data} }`;
    }

    /**
     * Converts the PocketMessage instance to a JSON string.
     * @returns A JSON string representation of the PocketMessage instance.
     */
    public toJSON(): string {
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
    public toObject(): {
        code: C;
        level: L;
        body: B;
        timestamp: PocketTimestamp;
        data?: D;
    } {
        return {
            code: this.code,
            level: this.level,
            body: this.body,
            timestamp: this.timestamp,
            data: this.data
        };
    }
}

 export {
    type PocketMessageEntry,
    type PocketMessageConfigurationOptions,
    PocketMessage
 }       