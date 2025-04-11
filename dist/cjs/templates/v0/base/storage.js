"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStorageLocations = void 0;
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
var BaseStorageLocations;
(function (BaseStorageLocations) {
    BaseStorageLocations["FILE"] = "FILE";
    BaseStorageLocations["DIRECTORY"] = "DIRECTORY";
    BaseStorageLocations["IPFS_FILE_CID"] = "IPFS_FILE_CID";
    BaseStorageLocations["IPFS_DIRECTORY_CID"] = "IPFS_DIRECTORY_CID";
    BaseStorageLocations["MULTIFORMATS"] = "MULTIFORMATS";
    BaseStorageLocations["DATABASE"] = "DATABASE";
    BaseStorageLocations["CACHE"] = "CACHE";
    BaseStorageLocations["MEMORY"] = "MEMORY";
    BaseStorageLocations["TEMPORARY"] = "TEMPORARY";
    BaseStorageLocations["COOKIE"] = "COOKIE";
    BaseStorageLocations["LOCAL_STORAGE"] = "LOCAL_STORAGE";
    BaseStorageLocations["SESSION_STORAGE"] = "SESSION_STORAGE";
    BaseStorageLocations["OTHER"] = "OTHER";
})(BaseStorageLocations || (exports.BaseStorageLocations = BaseStorageLocations = {}));
//# sourceMappingURL=storage.js.map