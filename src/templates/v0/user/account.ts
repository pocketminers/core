interface PocketUserAccountTimestamps {
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    lastLoginAt: string | null;
    lastActivityAt: string | null;
    [key: string]: string | null;
}

interface PocketUserAccount {
    id: string;
    name: string;
    contacts: Array<PocketUserAccountContact>;
    timestamps: PocketUserAccountTimestamps;
}

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

type PocketUserAccountContactType = keyof typeof PocketUserAccountContactTypes;

interface PocketUserAccountVerifiedContact {
    verifiedAt: string;
    verifiedBy: string;
    verificationMethod: string;
    verificationStatus: string;
    verificationProof: string;
    verificationData: string;
}

interface PocketUserAccountContact {
    type: PocketUserAccountContactType;
    value: string;
    verified: boolean;
    verification: PocketUserAccountVerifiedContact | null;

}


export {
    type PocketUserAccount,
    type PocketUserAccountContact,
    type PocketUserAccountContactType,
    type PocketUserAccountVerifiedContact,
    type PocketUserAccountTimestamps,
    PocketUserAccountContactTypes
}
