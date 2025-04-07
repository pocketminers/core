import { StringOrEmpty } from "@templates/v0/base/value";




/**
 * PocketUserAccountTimestamps represents the timestamps associated with a user account.
 * It includes the creation date, last login date, and other relevant timestamps.
 */
interface BaseTimestamps {
    createdAt: string;
    updatedAt: StringOrEmpty;
    deletedAt: StringOrEmpty;
    lastLoginAt: StringOrEmpty;
    lastActivityAt: StringOrEmpty;
    [key: string]: StringOrEmpty;
}


export {
    type BaseTimestamps
}