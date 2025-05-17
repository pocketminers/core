// /**
//  * file: account.ts
//  * description: This file defines the structure of a user account in the Pocket Network.
//  * It includes properties such as account ID, name, contacts, timestamps, storage, and metadata.
//  */
// import { BaseMetadata } from "../../v0/base/metadata.js";
// import { BaseValue, StringOrEmpty } from "../../v0/base/value.js";
// /**
//  * PocketUserAccountTimestamps represents the timestamps associated with a user account.
//  * It includes the creation date, last login date, and other relevant timestamps.
//  */
// interface PocketUserAccountTimestamps {
//     createdAt: string;
//     updatedAt: StringOrEmpty;
//     deletedAt: StringOrEmpty;
//     lastLoginAt: StringOrEmpty;
//     lastActivityAt: StringOrEmpty;
//     [key: string]: StringOrEmpty;
// }
// /**
//  * The PocketUserAccount interface represents a user account in the Pocket Network.
//  * It includes properties such as ID, name, contacts, timestamps, storage, and metadata.
//  */
// interface PocketUserAccount {
//     id: string;
//     name: string;
//     contacts: Array<PocketUserAccountContact>;
//     timestamps: PocketUserAccountTimestamps;
//     storage: Array<PocketStorage<any>>;
//     metadata: BaseMetadata;
// }
// /**
//  * PocketUserActTypes is an enumeration of the different types of contacts
//  * that a user account can have. It includes types such as EMAIL, PHONE, ADDRESS, etc.
//  */
// enum PocketUserAccountContactTypes {
//     EMAIL = "EMAIL",
//     PHONE = "PHONE",
//     ADDRESS = "ADDRESS",
//     SOCIAL = "SOCIAL",
//     DID = "DID",
//     WWW = "WWW",
//     APP = "APP",
//     PHYSICAL = "PHYSICAL",
//     OTHER = "OTHER"
// }
// /**
//  * PocketUserAccountContactType is a type that represents the different types of contacts
//  * that a user account can have. It is a key of the PocketUserAccountContactTypes enum.
//  */
// type PocketUserAccountContactType = keyof typeof PocketUserAccountContactTypes;
// /**
//  * PocketUserAccountVerifiedContact represents a verified contact for a user account.
//  * It includes properties such as verification method, status, proof, and data.
//  */
// interface PocketUserAccountVerifiedContact {
//     verifiedAt?: StringOrEmpty;
//     verifiedBy?: StringOrEmpty;
//     verificationMethod?: StringOrEmpty;
//     verificationStatus?: StringOrEmpty;
//     verificationProof?: BaseValue;
//     verificationData?: BaseValue;
// }
// /**
//  * PocketUserAccountContact represents a contact for a user account.
//  * It includes properties such as type, value, verified status, and verification details.
//  */
// interface PocketUserAccountContact {
//     type: PocketUserAccountContactType;
//     value: string;
//     verified: boolean;
//     verification: PocketUserAccountVerifiedContact | null;
// }
// export {
//     type PocketUserAccount,
//     type PocketUserAccountContact,
//     type PocketUserAccountContactType,
//     type PocketUserAccountVerifiedContact,
//     type PocketUserAccountTimestamps,
//     PocketUserAccountContactTypes
// }
//# sourceMappingURL=account.js.map