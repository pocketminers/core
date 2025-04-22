import { PocketObject } from "../base/index.js";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes, BaseObjectTypes, BaseValue } from "../../templates/v0/index.js";
/**
 * IdentityEntry is a generic type that represents an identity entry object.
 * It extends the BaseIdentifier interface and includes a meta property.
 *
 * @template I - The type of the identifier associated with the identity.
 *
 * @extends BaseIdentifier
 *
 * @example
 * const identityEntry: IdentityEntry<string> = {
 *    type_: "exampleType",
 *   value: "exampleValue"
 * };
 */
interface IdentityEntry<I extends BaseIdentifierType> extends BaseIdentifier<I>, Record<'meta', BaseIdentifier<I>> {
}
/**
 * Identity is a generic class that represents an identity object.
 * It extends the PocketObject class and implements the BaseIdentifier interface.
 *
 * @template I - The type of the identifier associated with the identity.
 *
 * @extends PocketObject
 * @implements BaseIdentifier
 *
 * @example
 * const identity = new Identity({
 *     type_: "exampleType",
 *     value: "exampleValue"
 * });
 */
declare class Identity<I extends BaseIdentifierType> extends PocketObject<BaseIdentifier<I>, I, BaseObjectTypes.Identifier> implements BaseIdentifier<I> {
    static readonly type_ = BaseIdentifierTypes.Undefined;
    static readonly objectType = BaseObjectTypes.Identifier;
    constructor({ type_, value }: {
        type_: I;
        value: string;
    });
    get type_(): I;
    get value(): BaseValue;
}
export { type IdentityEntry, Identity };
//# sourceMappingURL=index.d.ts.map