"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketMessage = void 0;
class PocketMessage {
    id;
    status;
    error;
    errorStack;
    body;
    data;
    static getErrorMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }
    static getErrorStack(error) {
        if (error instanceof Error) {
            return error.stack;
        }
        return undefined;
    }
}
exports.PocketMessage = PocketMessage;
//# sourceMappingURL=message.js.map