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
export { PocketMessage };
//# sourceMappingURL=message.js.map