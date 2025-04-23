import { BaseClientErrorCodes, BaseInfoCodes, BaseMessageCodes, BaseMessageLevels, BaseServerErrorCodes, BaseSuccessCodes, BaseWarningCodes } from "@templates/v0/base/message";
import { Freezer } from "@utilities/freezer";


interface PocketMessageEntry
<
    C extends BaseMessageCodes = BaseSuccessCodes.OK,
    L extends BaseMessageLevels = BaseMessageLevels.SUCCESS,
    B = any,
    D = any,
>
    extends
        Record<'code', BaseMessageCodes>,
        Record<'level', BaseMessageLevels>,
        Record<'body', any>,
        Record<'timestamp', Date>,
        Record<'data', any>,
        Record<'printToConsole', boolean>,
        Record<'callback', (message?: PocketMessage<C, L, B, D>) => Promise<void>>,
        Record<'delayCallback', number>
{}

/**
 * PocketMessage is a class that represents a message with a code, level, body, timestamp, and optional data.
 * - It is used to encapsulate messages in the Pocket framework.
 * - The class is generic and can be used with different types of codes, levels, body, and data.
 * - This class also ensures that the message object is immutable after creation.
 * - This class does not extend the PocketObject class, as it does not include a metadata object.
 */
class PocketMessage
<
    C extends BaseMessageCodes = BaseSuccessCodes.OK,
    L extends BaseMessageLevels = BaseMessageLevels.SUCCESS,
    B = any,
    D = any,
>
{
    public readonly code: C;
    public readonly level: L;
    public readonly body: B;
    public readonly timestamp: Date;
    public readonly data?: D;
    public readonly callback?: (message?: PocketMessage<C, L, B, D>) => Promise<void>;

    constructor({
        code,
        level,
        body,
        timestamp,
        data,
        printToConsole = false,
        callback,
        delayCallback = 0
    }: {
        code?: C,
        level?: L,
        body?: B,
        timestamp?: Date,
        data?: D,
        printToConsole?: boolean,
        callback?: (message?: PocketMessage<C, L, B, D>) => Promise<void>,
        delayCallback?: number
    }) {

        this.code = code !== undefined ? code : BaseSuccessCodes.OK as C;
        const expectedLevel = this.getLevelFromCode(this.code);
        this.level = level !== undefined ? level : expectedLevel as L;
        this.checkCodeAndLevel(this.code, this.level);

        this.body = body !== undefined ? body : {} as B;
        this.timestamp = timestamp !== undefined ? timestamp : new Date();
        this.data = data !== undefined ? data : {} as D;
        this.callback = callback;

        Freezer.deepFreeze(this);

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
        switch (level) {
            case BaseMessageLevels.INFO:
                // check that the code is in the BaseInfoCodes enum
                if (!Object.values(BaseInfoCodes).includes(code as BaseInfoCodes)) {
                    throw new Error(`Invalid code for INFO level: ${code}`);
                }
                break;
            case BaseMessageLevels.SUCCESS:
                // check that the code is in the BaseSuccessCodes enum
                if (!Object.values(BaseSuccessCodes).includes(code as BaseSuccessCodes)) {
                    throw new Error(`Invalid code for SUCCESS level: ${code}`);
                }
                break;
            case BaseMessageLevels.WARNING:
                // check that the code is in the BaseWarningCodes enum
                if (!Object.values(BaseWarningCodes).includes(code as BaseWarningCodes)) {
                    throw new Error(`Invalid code for WARNING level: ${code}`);
                }
                break;
            case BaseMessageLevels.ERROR:
                // check that the code is in the BaseClientErrorCodes and BaseServerErrorCodes enum
                if (
                    !Object.values(BaseClientErrorCodes).includes(code as BaseClientErrorCodes) &&
                    !Object.values(BaseServerErrorCodes).includes(code as BaseServerErrorCodes)
                ) {
                    throw new Error(`Invalid code for ERROR level: ${code}`);
                }
                break;
            default:
                throw new Error(`Invalid level: ${level}`);
        }
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
        if (printToConsole !== undefined && printToConsole) {
            this.printMessage();
        }
    }


    /**
     * Prints the message to the console based on its level.
     * - INFO: console.info
     * - SUCCESS: console.log
     * - WARNING: console.warn
     * - ERROR: console.error
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
        timestamp: Date;
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
    PocketMessage
 }       