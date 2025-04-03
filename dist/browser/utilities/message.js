var PocketMessage = /** @class */ (function () {
    function PocketMessage() {
    }
    PocketMessage.getErrorMessage = function (error) {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    };
    PocketMessage.getErrorStack = function (error) {
        if (error instanceof Error) {
            return error.stack;
        }
        return undefined;
    };
    return PocketMessage;
}());
export { PocketMessage };
//# sourceMappingURL=message.js.map