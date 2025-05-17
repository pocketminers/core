import { PocketMessage, PocketMessageConfigurationOptions } from '@components/common/message';
import { BaseClientErrorCodes, BaseServerErrorCodes, BaseWarningCodes } from '@templates/v0';
import { BaseMessageLevels } from '@templates/v0/base/message';
import { PocketTimestamp } from '@components/base/timestamp';

interface PocketErrorMessageConfigurationOptions
    extends 
        PocketMessageConfigurationOptions,
        Record<'throwError', boolean>
{}

interface PocketErrorMessageEntry
<
    C extends BaseClientErrorCodes | BaseWarningCodes | BaseServerErrorCodes,
    L extends Extract<BaseMessageLevels, 'ERROR' | 'CRITICAL' | 'WARNING' | 'TRACE'>,
    E extends Error = any,
    D = any
>
    extends
        Record<'code',C>,
        Partial<Record<'level', L>>,
        Partial<Record<'error', E>>,
        Partial<Record<'data', D>>,
        Partial<Record<'timestamp', PocketTimestamp>>,
        Partial<Record<'configuration', PocketErrorMessageConfigurationOptions>>
{}


/**
 * PocketErrorMessage is a class that represents an error message in the Pocket framework.
 * It extends the PocketMessage class and provides additional functionality for handling errors.
 */
class PocketErrorMessage
<
    C extends BaseClientErrorCodes | BaseWarningCodes | BaseServerErrorCodes,
    L extends Extract<BaseMessageLevels, 'ERROR' | 'CRITICAL' | 'WARNING' | 'TRACE'>,
    E extends Error = any,
    D = any
>
    extends PocketMessage<C, L, E, D>
{

    public static readonly defaultOptions: PocketErrorMessageConfigurationOptions = {
        ...PocketMessage.defaultOptions,
        throwError: false,            
    };

    constructor({
        code,
        level,
        error,
        timestamp,
        data,
        configuration: {
            throwError,
            callback,
            delayCallback,
            printToConsole,
            freeze,
        } = {
            ...PocketErrorMessage.defaultOptions,
            ...PocketMessage.defaultOptions,
            throwError: false,
            callback: undefined,
            delayCallback: 0
        },
    }: PocketErrorMessageEntry<C,L,E,D>) {
        super({
            code: code !== undefined ? code as C : BaseClientErrorCodes.BAD_REQUEST as C,
            level: level !== undefined ? level as L : BaseMessageLevels.ERROR as L,
            body: error !== undefined ? error : {} as E,
            timestamp: timestamp !== undefined ? timestamp : new PocketTimestamp(new Date()),
            data: data !== undefined ? data : {} as D,
            configuration: {
                freeze: freeze !== undefined ? freeze : PocketErrorMessage.defaultOptions.freeze,
                printToConsole: printToConsole !== undefined ? printToConsole : PocketErrorMessage.defaultOptions.printToConsole,
                callback: callback,
                delayCallback: delayCallback,
                throwError: throwError !== undefined ? throwError : PocketErrorMessage.defaultOptions.throwError,
            }
        });

        // this.handleThrowError(throwError !== undefined ? throwError : false);

        if (throwError === true) {
            throw this.body;
        }

        this.initializeImmuteable({
            force: true
        });
    }

    public get Error(): E {
        return this.body;
    }

    public get ErrorMessage(): string {
        return this.body.message;
    }

    public handleThrowError(throwError: boolean): void {
        if (throwError === true) {
            throw this.body;
        } 
    }
}

export {
    PocketErrorMessage
};