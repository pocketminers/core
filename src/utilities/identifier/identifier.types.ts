import { BaseTypes, HashedStorageItem } from "@component/base";

/**
 * The IdentifierFormats enum is a string enumeration that represents the available identifier formats.
 */
enum IdentifierFormats {
    UUID = "UUID",
    Random = "Random",
    Name = "Name",
    Timestamp = "Timestamp",
    Password = "Password"
}


/**
 * The IdentifierFormats type is a string that is used to specify the type of identifier to create.
 */
type IdentifierFormat = keyof typeof IdentifierFormats;


/**
 * The Identifier type is a string that represents a unique identifier.
 */
type Identifier = string;


/**
 * The IdentifiableBaseType enum is a string enumeration that represents the base types that can be identified.
 */
enum IdentifiableBaseTypes {
    Command = "Command",
    Message = "Message",
    Job = "Job",
    Custom = "Custom"
}

/**
 * The IdentifiableBaseType type is a string that is used to specify the base type of an identifiable item.
 */
type IdentifiableBaseType = keyof typeof IdentifiableBaseTypes;


/**
 * The IdentityStorageSchema type is a schema for an identity storage item.
 */
interface IdentityStorageSchema
    extends
        Record<"id", Identifier>,
        Record<'type', IdentifiableBaseType> {}


/**
 * The IdentityStorageItem type is a hashed storage item for an identity storage schema.
 * - This is used to store a single identity item in a storage.
 */
type IdentityStorageItem = HashedStorageItem<BaseTypes.Identity, IdentityStorageSchema>;



export {
    type Identifier,
    IdentifierFormats,
    type IdentifierFormat,
    type IdentifiableBaseType,
    IdentifiableBaseTypes,
    type IdentityStorageSchema,
    type IdentityStorageItem
}

