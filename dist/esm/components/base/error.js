import { PocketMessage } from '../base/message.js';
import { BaseMessageLevels } from '../../templates/v0/base/message.js';
/**
 * PocketErrorMessage is a class that represents an error message in the Pocket framework.
 * It extends the PocketMessage class and provides additional functionality for handling errors.
 */
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
    get Error() {
        return this.body;
    }
    get ErrorMessage() {
        return this.body.message;
    }
    handleThrowError(throwError) {
        if (throwError) {
            throw this;
        }
    }
}
export { PocketErrorMessage };
//# sourceMappingURL=error.js.map