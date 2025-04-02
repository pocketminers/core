class PocketMessage {
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
const empty = null;
export { PocketMessage };
//# sourceMappingURL=message.js.map