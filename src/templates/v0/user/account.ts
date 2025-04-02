/**
 * file: account.ts
 * description: This file defines the structure of a user account in the Pocket Network.
 * It includes properties such as account ID, name, contacts, timestamps, storage, and metadata.
 */


/**
 * StringOrEmpty is a type that can be either a string or null/undefined.
 * It is used to represent optional or empty values.
 * This is useful for properties that may not always have a value.
 * For example, a contact's phone number may not be provided, so it can be null or undefined.
 * This type is used in various places in the code to ensure that properties can be optional.
 */
type StringOrEmpty = string | null | undefined;


/**
 * PocketUserAccountTimestamps represents the timestamps associated with a user account.
 * It includes the creation date, last login date, and other relevant timestamps.
 */
interface PocketUserAccountTimestamps {
    createdAt: string;
    updatedAt: StringOrEmpty;
    deletedAt: StringOrEmpty;
    lastLoginAt: StringOrEmpty;
    lastActivityAt: StringOrEmpty;
    [key: string]: StringOrEmpty;
}

/**
 * Values can be of various types, including:
 * - string
 * - number
 * - object
 * - boolean
 * - null
 * - array of any of the above types
 */
type PocketUserAccountValue = string | number | object | boolean | null | undefined | (string | number | object | boolean | null | undefined)[];

/**
 * Annotations are key-value pairs that provide additional information about the user account.
 */
interface PocketUserAccountMetadataAnnotations {
    [key: string]: PocketUserAccountValue;
}

/**
 * Labels are key-value pairs that can be used to categorize or tag the user account.
 */
interface PocketUserAccountMetadataLabels {
    tags?: (string | number)[] | null;
    [key: (string | number)]: PocketUserAccountValue;
}

/**
 * Metadata contains additional information about the user account, including annotations and labels.
 */
interface PocketUserAccountMetadata {
    name: string;
    description: string;
    annotations: PocketUserAccountMetadataAnnotations;
    labels: PocketUserAccountMetadataLabels;
}

/**
 * StorageItem represents an item in the user's storage.
 * It includes properties such as name, description, type, size, and value.
 */
interface PocketUserAccountStorageItem {
    name: string;
    description: string;
    type: string;
    size: number;
    value: PocketUserAccountValue;
}

/**
 * PocketUserAccountStorageTypes is an enumeration of the different types of storage
 * that a user account can have. It includes types such as FILE, DIRECTORY, DATABASE, etc.
 */
enum PocketUserAccountStorageTypes {
    FILE = "FILE",
    DIRECTORY = "DIRECTORY",
    IPFS_FILE_CID = "IPFS_FILE",
    IPFS_DIRECTORY_CID = "IPFS_DIRECTORY",
    DATABASE = "DATABASE",
    CACHE = "CACHE",
    MEMORY = "MEMORY",
    TEMPORARY = "TEMPORARY",
    COOKIE = "COOKIE",
    LOCAL_STORAGE = "LOCAL_STORAGE",
    SESSION_STORAGE = "SESSION_STORAGE",
    OTHER = "OTHER"
}

type PocketUserAccountStorageType = keyof typeof PocketUserAccountStorageTypes;

/**
 * Storage contains a collection of the user's storage, including the type and size.
 */
interface PocketUserAccountStorage {
    name: string;
    description: string;
    type: PocketUserAccountStorageType;
    size: number;
    items: PocketUserAccountStorageItem[];
}

/**
 * The PocketUserAccount interface represents a user account in the Pocket Network.
 * It includes properties such as ID, name, contacts, timestamps, storage, and metadata.
 */
interface PocketUserAccount {
    id: string;
    name: string;
    contacts: Array<PocketUserAccountContact>;
    timestamps: PocketUserAccountTimestamps;
    storage: Array<PocketUserAccountStorage>;
    metadata: PocketUserAccountMetadata;
}

/**
 * PocketUserAccountContactTypes is an enumeration of the different types of contacts
 * that a user account can have. It includes types such as EMAIL, PHONE, ADDRESS, etc.
 */
enum PocketUserAccountContactTypes {
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    ADDRESS = "ADDRESS",
    SOCIAL = "SOCIAL",
    DID = "DID",
    WWW = "WWW",
    APP = "APP",
    PHYSICAL = "PHYSICAL",
    OTHER = "OTHER"
}

/**
 * PocketUserAccountContactType is a type that represents the different types of contacts
 * that a user account can have. It is a key of the PocketUserAccountContactTypes enum.
 */
type PocketUserAccountContactType = keyof typeof PocketUserAccountContactTypes;

/**
 * PocketUserAccountVerifiedContact represents a verified contact for a user account.
 * It includes properties such as verification method, status, proof, and data.
 */
interface PocketUserAccountVerifiedContact {
    verifiedAt?: StringOrEmpty;
    verifiedBy?: StringOrEmpty;
    verificationMethod?: StringOrEmpty;
    verificationStatus?: StringOrEmpty;
    verificationProof?: PocketUserAccountValue;
    verificationData?: PocketUserAccountValue;
}

/**
 * PocketUserAccountContact represents a contact for a user account.
 * It includes properties such as type, value, verified status, and verification details.
 */
interface PocketUserAccountContact {
    type: PocketUserAccountContactType;
    value: string;
    verified: boolean;
    verification: PocketUserAccountVerifiedContact | null;

}


export {
    type StringOrEmpty,
    type PocketUserAccountValue,
    type PocketUserAccountMetadataAnnotations,
    type PocketUserAccountMetadataLabels,
    type PocketUserAccountMetadata,
    type PocketUserAccountStorage,
    type PocketUserAccountStorageItem,
    type PocketUserAccountStorageType,
    type PocketUserAccount,
    type PocketUserAccountContact,
    type PocketUserAccountContactType,
    type PocketUserAccountVerifiedContact,
    type PocketUserAccountTimestamps,
    PocketUserAccountContactTypes,
    PocketUserAccountStorageTypes
}
