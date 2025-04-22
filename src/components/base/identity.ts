import { PocketObject } from "@components/base";
import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats, BaseObjectTypes, BaseValue } from "@templates/v0";
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
 *    format: "exampleType",
 *   value: "exampleValue"
 * };
 */
interface IdentityEntry
<
    I extends BaseIdentifierFormat
>
    extends
        BaseIdentifier<I>
{}


/**
 * PocketIdentity is a generic class that represents an identity object.
 */
class PocketIdentity
<
    I extends BaseIdentifierFormat
>
    implements
        BaseIdentifier<I>
{
    public readonly format: I
    public readonly value: string;

    constructor({
        format,
        value
    }: {
        format: I;
        value: string;
    }) {
        if (format === undefined) {
            throw new Error("Type is required");
        }

        if (value === undefined) {
            throw new Error("Value is required");
        }

        // check if the value is the correct format
        PocketIdentity.checkIdentityType(format, value);

        this.format = format;
        this.value = value;
    }


    private static checkIdentityType(
        format: BaseIdentifierFormat,
        value: string
    ): void {
        switch (format) {
            case BaseIdentifierFormats.Multihash:

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