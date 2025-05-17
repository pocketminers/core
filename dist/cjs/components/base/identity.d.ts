import { BaseIdentifier, BaseIdentifierFormat } from "../../templates/v0/index.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 * - Identifiers are immutable after creation.
 *
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 *
 * @example
 */
declare class PocketIdentity<I extends BaseIdentifierFormat> implements BaseIdentifier<I> {
    readonly format: I;
    readonly value: string;
    constructor({ format, value }: {
        format: I;
        value?: string;
    });
}
export { PocketIdentity };
//# sourceMappingURL=identity.d.ts.map