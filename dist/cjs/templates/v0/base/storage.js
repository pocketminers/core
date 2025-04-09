"use strict";
// import { BaseMetadata } from "../../v0/base/metadata";
// import { BaseValue, NumberOrEmpty, StringOrEmpty } from "../../v0/base/value";
// import { BaseIdentifierType } from "./identifier";
// import { BaseObjectTypes } from "./object";
// /**
//  * StorageItem represents an item in the user's storage.
//  * It includes properties such as name, description, type, size, and value.
//  */
// interface BaseStorageItem<T, I extends BaseIdentifierType> {
//     name: string;
//     description?: StringOrEmpty;
//     type: string | number | symbol;
//     size: NumberOrEmpty;
//     value: BaseValue<T>;
//     metadata?: BaseMetadata<I, BaseObjectTypes.StorageItem>;
// }
// /**
//  * BaseStorageTypes is an enumeration of the different types of storage
//  * that a user account can have. It includes types such as FILE, DIRECTORY, DATABASE, etc.
//  */
// enum BaseStorageLocations {
//     FILE = "FILE",
//     DIRECTORY = "DIRECTORY",
//     IPFS_FILE_CID = "IPFS_FILE_CID",
//     IPFS_DIRECTORY_CID = "IPFS_DIRECTORY_CID",
//     MULTIFORMATS = "MULTIFORMATS",
//     DATABASE = "DATABASE",
//     CACHE = "CACHE",
//     MEMORY = "MEMORY",
//     TEMPORARY = "TEMPORARY",
//     COOKIE = "COOKIE",
//     LOCAL_STORAGE = "LOCAL_STORAGE",
//     SESSION_STORAGE = "SESSION_STORAGE",
//     OTHER = "OTHER"
// }
// /**
//  * BaseStorageLocation is a type that can be any of the keys in the BaseStorageLocations enum.
//  * It is used to represent the location of a storage item.
//  */
// type BaseStorageLocation = keyof typeof BaseStorageLocations;
// /**
//  * Storage contains a collection of the user's storage, including the type and size.
//  */
// interface BaseStorage
// <
//     I extends BaseIdentifierType,
//     L extends BaseStorageLocation = BaseStorageLocations.MEMORY,
//     T extends BaseValue = any,
// > {
//     name?: string;
//     description?: StringOrEmpty;
//     location?: L;
//     size?: NumberOrEmpty;
//     items: Array<BaseStorageItem<T>>;
//     addItem: (item: BaseStorageItem<T>) => void;
//     removeItem: (itemName: string) => void;
//     getItem: (itemName: string) => BaseStorageItem<T> | undefined;
//     clear: () => void;
//     getSize: () => number;
//     getLocation: () => BaseStorageLocation;
//     getType: () => string;
// }
// export {
//     type BaseStorage,
//     type BaseStorageItem,
//     type BaseStorageLocation,
//     BaseStorageLocations,
// }
//# sourceMappingURL=storage.js.map