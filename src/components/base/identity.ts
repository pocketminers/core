import { PocketObject } from "@components/base";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes, BaseObjectTypes, BaseValue } from "@templates/v0";
import { MultiHashUtilities } from "@utilities/multiHash";


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
interface IdentityEntry
<
    I extends BaseIdentifierType
>
    extends
        BaseIdentifier<I>
{}


/**
 * PocketIdentity is a generic class that represents an identity object.
 */
class PocketIdentity
<
    I extends BaseIdentifierType
>
    implements
        BaseIdentifier<I>
{
    public readonly type_: I
    public readonly value: string;

    constructor({
        type_,
        value
    }: {
        type_: I;
        value: string;
    }) {
        if (type_ === undefined) {
            throw new Error("Type is required");
        }

        if (value === undefined) {
            throw new Error("Value is required");
        }

        // check if the value is the correct type_
        PocketIdentity.checkIdentityType(type_, value);

        this.type_ = type_;
        this.value = value;
    }


    private static checkIdentityType(
        type_: BaseIdentifierType,
        value: string
    ): void {
        switch (type_) {
            case BaseIdentifierTypes.Multihash:

                if (!MultiHashUtilities.isValidMultihash(value)) {
                    throw new Error("Invalid multihash");
                }
                break;

            default:
                break
        }
    }
}

export {
    type IdentityEntry,
    PocketIdentity
}