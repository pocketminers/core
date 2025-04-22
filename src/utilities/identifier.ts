import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats, BaseIdentifierTypeList } from "@templates/v0";
import { MultiHashUtilities } from "@utilities/multiHash";



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
        }
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
        value: string,
        format: I
    } {
        const prefix = options?.prefix || "";
        const suffix = options?.suffix || "";

        let identifier = prefix

        switch (format) {
            case "UUID":
                identifier += IdentifierUtilities.generateUUIDv4();
                break;
            default:
                // check if the format is valid
                if (format !== undefined && !BaseIdentifierTypeList.includes(format)) {
                    throw new Error(`Invalid identifier format: ${format}`);
                }
                identifier += IdentifierUtilities.generateRandomString(options?.length);
                break;
        }

        identifier += suffix;

        if (format === undefined) {
            return {
                value: identifier,
                format: BaseIdentifierFormats.Undefined as I
            };
        }

        return {
            value: identifier,
            format
        };
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

    private static generateUUIDv4(): string {
        {
            const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        
            // check the generated id format using regex
            const idRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
            if (!idRegex.test(id)) {
                return IdentifierUtilities.generateUUIDv4();
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
    IdentifierUtilities
}