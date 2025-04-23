import { BaseIdentifier, BaseIdentifierFormat } from "@templates/v0";
import { Freezer } from "@utilities/freezer";
import { IdentifierUtilities } from "@utilities/identifier";

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
        IdentifierUtilities.checkIdentityFormat(format, value);

        this.format = format;
        this.value = value;

        Freezer.deepFreeze(this);
    }
}

export {
    type IdentityEntry,
    PocketIdentity
}