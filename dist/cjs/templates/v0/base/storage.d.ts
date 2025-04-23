import { NumberOrEmpty } from "../../v0/base/value.js";
import { BaseIdentifier } from "./identifier.js";
import { BaseObjectType } from "./object.js";
/**
 * BaseStorageTypes is an enumeration of the different types of storage
 * that a user account can have. It includes types such as FILE, DIRECTORY, DATABASE, etc.
 */
declare enum BaseStorageLocations {
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
interface BaseStorage<S extends any, O extends BaseObjectType, L extends BaseStorageLocation> {
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
export { type BaseStorage, type BaseStorageLocation, BaseStorageLocations, };
//# sourceMappingURL=storage.d.ts.map