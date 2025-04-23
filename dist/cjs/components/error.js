"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketErrorMessage = void 0;
const message_1 = require("./message.js");
const message_2 = require("../templates/v0/base/message.js");
class PocketErrorMessage extends message_1.PocketMessage {
    constructor({ code, level, error, timestamp, data, throwError, callback, delayCallback = 0 }) {
        super({
            code,
            level: level !== undefined ? level : message_2.BaseMessageLevels.ERROR,
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
exports.PocketErrorMessage = PocketErrorMessage;
//# sourceMappingURL=error.js.map