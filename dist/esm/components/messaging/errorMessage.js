import { PocketMessage } from '../messaging/message.js';
import { BaseMessageLevels } from '../../templates/v0/base/message.js';
class PocketErrorMessage extends PocketMessage {
    constructor({ code, level, error, timestamp, data, throwError, callback }) {
        super({
            code,
            level: level !== undefined ? level : BaseMessageLevels.ERROR,
            body: error !== undefined ? error : {},
            timestamp: timestamp !== undefined ? timestamp : new Date(),
            data: data !== undefined ? data : {},
            printToConsole: false,
            callback: callback
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
//# sourceMappingURL=errorMessage.js.map