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
 *    type_: "exampleType",
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
class IdentifierUtilities {

    public static create<
            I extends BaseIdentifierFormat,
        >({
        format,
        options = {
            prefix: "",
            suffix: ""
        },
        type = undefined
    }: {
        format?: I,
        options?: {
            prefix?: string,
            suffix?: string,
            length?: number,
            timestamp?: number,
            seriesStart?: number,
            seriesEnd?: number,
            seriesStep?: number,
        },
    } = {}): {
        id: string,
        format: I
    } {
        const prefix = options?.prefix || "";
        const suffix = options?.suffix || "";

        let identifier = prefix

        switch (format) {
            case "UUID":
                identifier += IdentityFactory.generateUUIDv4();
                break;
            case "SERIES":
                identifier += IdentityFactory.generateRandomString(options?.length);
                break;
            case "Timestamp":
                identifier += IdentityFactory.generateISOTimestamp(options?.timestamp);
                break;
            case "Name":
                // identifier += IdentityFactory.createName();
                break;
            default:
                throw new Error(`Invalid identifier format: ${format}`);
        }

        identifier += suffix;

        if (type === undefined) {
            return {
                id: identifier,
                type: BaseTypes.Custom
            };
        }

        return {
            id: identifier,
            type
        };
    }

    private static checkIdentityType(
        type_: BaseIdentifierFormat,
        value: string
    ): void {
        switch (type_) {
            case BaseIdentifierFormats.Multihash:

                if (!MultiHashUtilities.isValidMultihash(value)) {
                    throw new Error("Invalid multihash");
                }
                break;

            default:
                break
        }
    }

    private static generateUUIDv4(): string {
        {
            const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        
            // check the generated id format using regex
            const idRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
            if (!idRegex.test(id)) {
                return PocketIdentity.generateUUIDv4();
            }
        
            return id;
        }
    }

    private static generateRandomString(length: number = 34): string {
        return Math.random().toString(36).substring(2, length + 2);
    }

    private static generateISOTimestamp(timestamp: number = Date.now()): string {
        return new Date(timestamp).toISOString();
    }

    private static formatIdentifier(identifier: string): string {
        return identifier;
    }

    private static checkForUUID(identifier: string): boolean {
        return identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) !== null;
    }
}

export {
    type IdentityEntry,
    PocketIdentity
}