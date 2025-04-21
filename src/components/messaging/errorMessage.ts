import { PocketMessage } from '@components/messaging/message';
import { BaseClientErrorCodes, BaseMessageCodes, BaseMessageLevel, BaseMessageLevels, BaseServerErrorCodes, BaseWarningCodes } from '@templates/v0/base/message';


class PocketErrorMessage
<
    C extends BaseClientErrorCodes | BaseWarningCodes | BaseServerErrorCodes = BaseClientErrorCodes.BAD_REQUEST,
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
        throwError
    }: {
        code: C,
        level?: L,
        error: E,
        timestamp?: Date,
        data?: D,
        throwError?: boolean
    }) {
        super({
            code,
            level: level !== undefined ? level : BaseMessageLevels.ERROR as L,
            body: error !== undefined ? error : {} as E,
            timestamp: timestamp !== undefined ? timestamp : new Date(),
            data: data !== undefined ? data : {} as D
        });

        if (throwError) {
            throw this;
        }
    }
}

export {
    PocketErrorMessage
};