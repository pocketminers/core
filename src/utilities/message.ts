import { BaseIdentifier, BaseIdentifierTypes } from "@templates/v0/base/identifier";

class PocketMessage {
    public id?: BaseIdentifier<BaseIdentifierTypes.UUID>;
    public status?: string;
    public error?: string | undefined;
    public errorStack?: string | undefined;
    public body: any;
    public data: any;

    static getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
        return error.message;
        }
        return String(error);
    }

    static getErrorStack(error: unknown): string | undefined {
        if (error instanceof Error) {
        return error.stack;
        }
        return undefined;
    }
}

export {
    PocketMessage
}