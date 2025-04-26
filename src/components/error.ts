import { PocketMessage } from '@components/message';
import { BaseClientErrorCodes, BaseMessageLevels, BaseServerErrorCodes, BaseWarningCodes } from '@templates/v0/base/message';


class PocketErrorMessage
<
    C extends BaseClientErrorCodes | BaseWarningCodes | BaseServerErrorCodes,
    L extends Extract<BaseMessageLevels, 'ERROR' | 'CRITICAL' | 'WARNING' | 'TRACE'> = BaseMessageLevels.ERROR,
    E extends Error = any,
    D = any
>
    extends PocketMessage<C, L, E, D>
{
    constructor({
        code,
        level,
        error,
        timestamp,
        data,
        throwError,
        callback,
        delayCallback = 0
    }: {
        code: C,
        level?: L,
        error: E,
        timestamp?: Date,
        data?: D,
        throwError?: boolean,
        callback?: (message?: PocketMessage<C, L, E, D>) => Promise<void>,
        delayCallback?: number
    }) {
        super({
            code,
            level: level !== undefined ? level : BaseMessageLevels.ERROR as L,
            body: error !== undefined ? error : {} as E,
            timestamp: timestamp !== undefined ? timestamp : new Date(),
            data: data !== undefined ? data : {} as D,
            printToConsole: false,
            callback: callback,
            delayCallback: delayCallback
        });

        this.handleThrowError(throwError !== undefined ? throwError : false);
    }

    public get Error(): E {
        return this.body;
    }

    public get ErrorMessage(): string {
        return this.body.message;
    }

    private handleThrowError(throwError: boolean): void {
        if (throwError) {
            throw this;
        }
    }
}

export {
    PocketErrorMessage
};