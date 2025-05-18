import { PocketMessage } from '../common/message.js';
import { BaseClientErrorCodes } from '../../templates/v0/index.js';
import { BaseMessageLevels } from '../../templates/v0/base/message.js';
import { PocketTimestamp } from '../base/timestamp.js';
/**
 * PocketErrorMessage is a class that represents an error message in the Pocket framework.
 * It extends the PocketMessage class and provides additional functionality for handling errors.
 */
class PocketErrorMessage extends PocketMessage {
    static defaultOptions = {
        ...PocketMessage.defaultOptions,
        throwError: false,
    };
    constructor({ code, level, error, timestamp, data, configuration: { throwError, callback, delayCallback, printToConsole, freeze, } = {
        ...PocketErrorMessage.defaultOptions,
        ...PocketMessage.defaultOptions,
        throwError: false,
        callback: undefined,
        delayCallback: 0
    }, }) {
        super({
            code: code !== undefined ? code : BaseClientErrorCodes.BAD_REQUEST,
            level: level !== undefined ? level : BaseMessageLevels.ERROR,
            body: error !== undefined ? error : {},
            timestamp: timestamp !== undefined ? timestamp : new PocketTimestamp(new Date()),
            data: data !== undefined ? data : {},
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
    get Error() {
        return this.body;
    }
    get ErrorMessage() {
        return this.body.message;
    }
    handleThrowError(throwError) {
        if (throwError === true) {
            throw this.body;
        }
    }
}
export { PocketErrorMessage };
//# sourceMappingURL=error.js.map