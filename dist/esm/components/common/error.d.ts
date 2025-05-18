import { PocketMessage, PocketMessageConfigurationOptions } from '../common/message.js';
import { BaseClientErrorCodes, BaseServerErrorCodes, BaseWarningCodes } from '../../templates/v0/index.js';
import { BaseMessageLevels } from '../../templates/v0/base/message.js';
import { PocketTimestamp } from '../base/timestamp.js';
interface PocketErrorMessageConfigurationOptions extends PocketMessageConfigurationOptions, Record<'throwError', boolean> {
}
interface PocketErrorMessageEntry<C extends BaseClientErrorCodes | BaseWarningCodes | BaseServerErrorCodes, L extends Extract<BaseMessageLevels, 'ERROR' | 'CRITICAL' | 'WARNING' | 'TRACE'>, E extends Error = any, D = any> extends Record<'code', C>, Partial<Record<'level', L>>, Partial<Record<'error', E>>, Partial<Record<'data', D>>, Partial<Record<'timestamp', PocketTimestamp>>, Partial<Record<'configuration', PocketErrorMessageConfigurationOptions>> {
}
/**
 * PocketErrorMessage is a class that represents an error message in the Pocket framework.
 * It extends the PocketMessage class and provides additional functionality for handling errors.
 */
declare class PocketErrorMessage<C extends BaseClientErrorCodes | BaseWarningCodes | BaseServerErrorCodes, L extends Extract<BaseMessageLevels, 'ERROR' | 'CRITICAL' | 'WARNING' | 'TRACE'>, E extends Error = any, D = any> extends PocketMessage<C, L, E, D> {
    static readonly defaultOptions: PocketErrorMessageConfigurationOptions;
    constructor({ code, level, error, timestamp, data, configuration: { throwError, callback, delayCallback, printToConsole, freeze, }, }: PocketErrorMessageEntry<C, L, E, D>);
    get Error(): E;
    get ErrorMessage(): string;
    handleThrowError(throwError: boolean): void;
}
export { PocketErrorMessage };
//# sourceMappingURL=error.d.ts.map