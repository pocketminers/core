import { PocketMessage } from '../base/message.js';
import { BaseClientErrorCodes, BaseMessageLevels, BaseServerErrorCodes, BaseWarningCodes } from '../../templates/v0/base/message.js';
declare class PocketErrorMessage<C extends BaseClientErrorCodes | BaseWarningCodes | BaseServerErrorCodes = BaseClientErrorCodes.BAD_REQUEST, L extends Extract<BaseMessageLevels, 'ERROR' | 'CRITICAL' | 'WARNING' | 'TRACE'> = BaseMessageLevels.ERROR, E extends Error = any, D = any> extends PocketMessage<C, L, E, D> {
    constructor({ code, level, error, timestamp, data, throwError, callback, delayCallback }: {
        code: C;
        level?: L;
        error: E;
        timestamp?: Date;
        data?: D;
        throwError?: boolean;
        callback?: (message?: PocketMessage<C, L, E, D>) => Promise<void>;
        delayCallback?: number;
    });
    private handleThrowError;
}
export { PocketErrorMessage };
//# sourceMappingURL=error.d.ts.map