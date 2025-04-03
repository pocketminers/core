/**
 * file: account.ts
 * description: This file defines the structure of a user account in the Pocket Network.
 * It includes properties such as account ID, name, contacts, timestamps, storage, and metadata.
 */
/**
 * PocketUserAccountStorageTypes is an enumeration of the different types of storage
 * that a user account can have. It includes types such as FILE, DIRECTORY, DATABASE, etc.
 */
var PocketUserAccountStorageTypes;
(function (PocketUserAccountStorageTypes) {
    PocketUserAccountStorageTypes["FILE"] = "FILE";
    PocketUserAccountStorageTypes["DIRECTORY"] = "DIRECTORY";
    PocketUserAccountStorageTypes["IPFS_FILE_CID"] = "IPFS_FILE";
    PocketUserAccountStorageTypes["IPFS_DIRECTORY_CID"] = "IPFS_DIRECTORY";
    PocketUserAccountStorageTypes["DATABASE"] = "DATABASE";
    PocketUserAccountStorageTypes["CACHE"] = "CACHE";
    PocketUserAccountStorageTypes["MEMORY"] = "MEMORY";
    PocketUserAccountStorageTypes["TEMPORARY"] = "TEMPORARY";
    PocketUserAccountStorageTypes["COOKIE"] = "COOKIE";
    PocketUserAccountStorageTypes["LOCAL_STORAGE"] = "LOCAL_STORAGE";
    PocketUserAccountStorageTypes["SESSION_STORAGE"] = "SESSION_STORAGE";
    PocketUserAccountStorageTypes["OTHER"] = "OTHER";
})(PocketUserAccountStorageTypes || (PocketUserAccountStorageTypes = {}));
/**
 * PocketUserAccountContactTypes is an enumeration of the different types of contacts
 * that a user account can have. It includes types such as EMAIL, PHONE, ADDRESS, etc.
 */
var PocketUserAccountContactTypes;
(function (PocketUserAccountContactTypes) {
    PocketUserAccountContactTypes["EMAIL"] = "EMAIL";
    PocketUserAccountContactTypes["PHONE"] = "PHONE";
    PocketUserAccountContactTypes["ADDRESS"] = "ADDRESS";
    PocketUserAccountContactTypes["SOCIAL"] = "SOCIAL";
    PocketUserAccountContactTypes["DID"] = "DID";
    PocketUserAccountContactTypes["WWW"] = "WWW";
    PocketUserAccountContactTypes["APP"] = "APP";
    PocketUserAccountContactTypes["PHYSICAL"] = "PHYSICAL";
    PocketUserAccountContactTypes["OTHER"] = "OTHER";
})(PocketUserAccountContactTypes || (PocketUserAccountContactTypes = {}));
export { PocketUserAccountContactTypes, PocketUserAccountStorageTypes };
//# sourceMappingURL=account.js.map