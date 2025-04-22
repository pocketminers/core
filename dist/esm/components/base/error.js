import { PocketMessage } from '../base/message.js';
import { BaseMessageLevels } from '../../templates/v0/base/message.js';
class PocketErrorMessage extends PocketMessage {
    constructor({ code, level, error, timestamp, data, throwError, callback, delayCallback = 0 }) {
        super({
            code,
            level: level !== undefined ? level : BaseMessageLevels.ERROR,
            body: error !== undefined ? error : {},
            timestamp: timestamp !== undefined ? timestamp : new Date(),
            data: data !== undefined ? data : {},
            printToConsole: false,
            callback: callback,
            delayCallback: delayCallback
        });
        this.handleThrowError(throwError !== undefined ? throwError : false);
    }
    handleThrowError(throwError) {
        if (throwError) {
            throw this;
        }
    }
}
export { PocketErrorMessage };
//# sourceMappingURL=error.js.map