import { BaseMetadata } from "@templates/v0/base/metadata";
import { BaseValue, NumberOrEmpty, StringOrEmpty } from "@templates/v0/base/value";
import { BaseIdentifier, BaseIdentifierType } from "./identifier";
import { BaseObject, BaseObjectType, BaseObjectTypes } from "./object";
import { StorageTypes } from "@components/base/storage";


// /**
//  * StorageItem represents an item in the user's storage.
//  * It includes properties such as name, description, type, size, and value.
//  */
// interface BaseStorageItem<V, I extends BaseIdentifierType> {
//     name: string;
//     description?: StringOrEmpty;
//     type: string | number | symbol;
//     size: NumberOrEmpty;
//     value: BaseValue<V>;
//     metadata?: BaseMetadata<I, BaseObjectTypes.StorageItem>;
// }


/**
 * BaseStorageTypes is an enumeration of the different types of storage
 * that a user account can have. It includes types such as FILE, DIRECTORY, DATABASE, etc.
 */
enum BaseStorageLocations {
    FILE = "FILE",
    DIRECTORY = "DIRECTORY",
    IPFS_FILE_CID = "IPFS_FILE_CID",
    IPFS_DIRECTORY_CID = "IPFS_DIRECTORY_CID",
    MULTIFORMATS = "MULTIFORMATS",
    DATABASE = "DATABASE",
    CACHE = "CACHE",
    MEMORY = "MEMORY",
    TEMPORARY = "TEMPORARY",
    COOKIE = "COOKIE",
    LOCAL_STORAGE = "LOCAL_STORAGE",
    SESSION_STORAGE = "SESSION_STORAGE",
    OTHER = "OTHER"
}


/**
 * BaseStorageLocation is a type that can be any of the keys in the BaseStorageLocations enum.
 * It is used to represent the location of a storage item.
 */
type BaseStorageLocation = keyof typeof BaseStorageLocations;


/**
 * Storage contains a collection of the user's storage, including the type and size.
 */
interface BaseStorage
<
    S extends StorageTypes,
    O extends BaseObjectType,
    L extends BaseStorageLocation
> {
    location?: L;
    items: Array<S>;
    allowDuplicates: boolean;
    allowEmpty: boolean;
    maxSize: NumberOrEmpty;

    addItem: (item: S) => void;
    removeItem: (itemId: BaseIdentifier<any>) => void;
    getItem: (itemId: BaseIdentifier<any>) => S | undefined;
    clear: () => void;
    getSize: () => number;
    getLocation: () => L;
    getType: () => string;
}


export {
    type BaseStorage,
    type BaseStorageLocation,
    BaseStorageLocations,
}