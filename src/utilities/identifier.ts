import { BaseIdentifierFormat, BaseIdentifierFormats, BaseIdentifierTypeList } from "@templates/v0";
import { MultiHashUtilities } from "@utilities/multiHash";



/**
 * PocketIdentity is a generic class that represents an identity object.
 */
class IdentifierUtilities {

    /**
     * Creates a new identifier based on the provided format and options.
     * - The identifier is immutable after creation.
     * 
     * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
     * 
     * @example
     * const identifier = IdentifierUtilities.generateIdentifier({
     *    format: "Name",
     *    options: {
     *      prefix: "prefix-",
     *      suffix: "-suffix",
     *      length: 10
     *    }
     * });
     * console.log(identifier.value); // "prefix-abcdefghij-suffix"
     * 
     * @example
     * const identifier = IdentifierUtilities.generateIdentifier({
     *   format: "UUID"
     * });
     * console.log(identifier.value); // "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
     */
    public static generateIdentifier
    <
            I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID
    >({
        format = BaseIdentifierFormats.UUID as I,
        options = {
            prefix: "",
            suffix: "",
            length: 34
        }
    }: {
        format?: I,
        options?: {
            prefix?: string,
            suffix?: string,
            length?: number
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

            case "Name":
                identifier += IdentifierUtilities.generateRandomString(options?.length);
                break;

            case "Number":
                identifier += IdentifierUtilities.generateRandomNumber(options?.length);
                break;

            case "Symbol":
                break;

            default:
                // check if the format is valid
                if (format !== undefined && !BaseIdentifierTypeList.includes(format)) {
                    throw new Error(`Invalid identifier format: ${format}`);
                }
                // identifier += IdentifierUtilities.generateRandomString(options?.length);
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


    public static checkIdentityFormat(
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

    public static checkUUIDv4Format(
        value: string
    ): boolean {
        const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidv4Regex.test(value)) {
            return false;
        }
        return true;
    }

    public static generateUUIDv4(): string {
        {
            const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            if (!IdentifierUtilities.checkUUIDv4Format(id)) {
                IdentifierUtilities.generateUUIDv4();
            }
        
            return id;
        }
    }

    public static checkRandomStringFormat(
        value: string,
        length: number = 34
    ): boolean {
        if (value.length !== length) {
            return false;   
        }
        const randomStringRegex = /^[a-z0-9]+$/;
        if (!randomStringRegex.test(value)) {
            return false;
        }

        return true;
    }

    public static generateRandomString(length: number = 34): string {
        let id: string;

        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        id = '';
        for (let i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return id;
    }

    public static checkRandomNumberFormat(
        value: number,
        length: number = 34
    ): boolean {
        if (value.toString().length !== length) {
            return false;
        }
        const randomNumberRegex = /^[0-9]+$/;
        if (!randomNumberRegex.test(value.toString())) {
            return false;
        }
        return true;
    }


    public static generateRandomNumber(length: number = 34): number {
        let id = Math.floor(Math.random() * Math.pow(10, length));
        if (id.toString().length !== length) {
            for (let i = id.toString().length; i < length; i++) {
                id *= 10;
            }
            id += Math.floor(Math.random() * 10);
        }

        if (!IdentifierUtilities.checkRandomNumberFormat(id, length)) {
            IdentifierUtilities.generateRandomNumber(length);
        }

        return id;
    }
}

export {
    IdentifierUtilities
}