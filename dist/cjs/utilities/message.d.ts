import { BaseIdentifier, BaseIdentifierTypes } from "../templates/v0/base/identifier.js";
declare class PocketMessage {
    id?: BaseIdentifier<BaseIdentifierTypes.UUID>;
    status?: string;
    error?: string | undefined;
    errorStack?: string | undefined;
    body: any;
    data: any;
    static getErrorMessage(error: unknown): string;
    static getErrorStack(error: unknown): string | undefined;
}
export { PocketMessage };
//# sourceMappingURL=message.d.ts.map