"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketErrorMessage = void 0;
const message_1 = require("../common/message.js");
const v0_1 = require("../../templates/v0/index.js");
const message_2 = require("../../templates/v0/base/message.js");
const timestamp_1 = require("../base/timestamp.js");
/**
 * PocketErrorMessage is a class that represents an error message in the Pocket framework.
 * It extends the PocketMessage class and provides additional functionality for handling errors.
 */
class PocketErrorMessage extends message_1.PocketMessage {
    static defaultOptions = {
        ...message_1.PocketMessage.defaultOptions,
        throwError: false,
    };
    constructor({ code, level, error, timestamp, data, configuration: { throwError, callback, delayCallback, printToConsole, freeze, } = {
        ...PocketErrorMessage.defaultOptions,
        ...message_1.PocketMessage.defaultOptions,
        throwError: false,
        callback: undefined,
        delayCallback: 0
    }, }) {
        super({
            code: code !== undefined ? code : v0_1.BaseClientErrorCodes.BAD_REQUEST,
            level: level !== undefined ? level : message_2.BaseMessageLevels.ERROR,
            body: error !== undefined ? error : {},
            timestamp: timestamp !== undefined ? timestamp : new timestamp_1.PocketTimestamp(new Date()),
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
exports.PocketErrorMessage = PocketErrorMessage;
//# sourceMappingURL=error.js.map