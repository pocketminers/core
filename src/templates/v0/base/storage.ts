import { BaseMetadata } from "@templates/v0/base/metadata";
import { BaseValue, NumberOrEmpty, StringOrEmpty } from "@templates/v0/base/value";

/**
 * StorageItem represents an item in the user's storage.
 * It includes properties such as name, description, type, size, and value.
 */
interface BaseStorageItem<T> {
    name: string;
    description?: StringOrEmpty;
    type: string | number | symbol;
    size: NumberOrEmpty;
    value: BaseValue | T;
    metadata?: BaseMetadata;
}

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

type BaseStorageLocation = keyof typeof BaseStorageLocations;

/**
 * Storage contains a collection of the user's storage, including the type and size.
 */
interface BaseStorage<
    L extends BaseStorageLocation = BaseStorageLocations.MEMORY,
    T = any
> {
    name?: string;
    description?: StringOrEmpty;
    location?: L;
    size?: NumberOrEmpty;
    items: BaseStorageItem<T>[];

    addItem: (item: BaseStorageItem<T>) => void;
    removeItem: (itemName: string) => void;
    getItem: (itemName: string) => BaseStorageItem<T> | undefined;
    clear: () => void;
    getSize: () => number;
    getLocation: () => BaseStorageLocation;
    getType: () => string;
}





export {
    type BaseStorage,
    type BaseStorageItem,
    type BaseStorageType,
    BaseStorageTypes
}