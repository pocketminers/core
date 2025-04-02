import {
    type PocketUserAccount,
    type PocketUserAccountContact,
    type PocketUserAccountContactType,
    type PocketUserAccountVerifiedContact,
    type PocketUserAccountTimestamps,
    PocketUserAccountContactTypes
} from '../src/templates/v0/user/account';


describe('PocketUserAccount', () => {
    it('should have the correct properties', () => {
        const account: PocketUserAccount = {
            id: '123',
            name: 'John Doe',
            contacts: [],
            timestamps: {
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: null,
                deletedAt: null,
                lastLoginAt: null,
                lastActivityAt: null
            }
        };

        expect(account).toHaveProperty('id');
        expect(account).toHaveProperty('name');
        expect(account).toHaveProperty('contacts');
        expect(account).toHaveProperty('timestamps');
    });
});


describe('PocketUserAccountContact', () => {
    it('should have the correct properties', () => {
        const contact: PocketUserAccountContact = {
            type: PocketUserAccountContactTypes.EMAIL,
            value: 'test-user-001',
            verified: false,
            verification: null
        };
        expect(contact).toHaveProperty('type');
        expect(contact).toHaveProperty('value');
        expect(contact).toHaveProperty('verified');
        expect(contact).toHaveProperty('verification');
        expect(contact.type).toBe(PocketUserAccountContactTypes.EMAIL);
        expect(contact.value).toBe('test-user-001');
        expect(contact.verified).toBe(false);
        expect(contact.verification).toBe(null);
    });
    it('should have the correct type', () => {
        const contact: PocketUserAccountContact = {
            type: 'EMAIL',
            value: 'test-user-001',
            verified: false,
            verification: null
        };
        expect(contact.type).toBe(PocketUserAccountContactTypes.EMAIL);
    });
    it('should have the correct value', () => {
        const contact: PocketUserAccountContact = {
            type: 'EMAIL',
            value: 'test-user-001',
            verified: false,
            verification: null
        };
        expect(contact.value).toBe('test-user-001');
    });
    it('should have the correct verified status', () => {
        const contact: PocketUserAccountContact = {
            type: 'EMAIL',
            value: 'test-user-001',
            verified: false,
            verification: null
        };
        expect(contact.verified).toBe(false);
    });
    it('should have the correct verification', () => {
        const contact: PocketUserAccountContact = {
            type: 'EMAIL',
            value: 'test-user-001',
            verified: false,
            verification: null
        };
        expect(contact.verification).toBe(null);
    });
});

describe('PocketUserAccountContactTypes', () => {
    it('should have the correct types', () => {
        expect(PocketUserAccountContactTypes).toHaveProperty('EMAIL');
        expect(PocketUserAccountContactTypes).toHaveProperty('PHONE');
        expect(PocketUserAccountContactTypes).toHaveProperty('ADDRESS');
        expect(PocketUserAccountContactTypes).toHaveProperty('SOCIAL');
        expect(PocketUserAccountContactTypes).toHaveProperty('DID');
        expect(PocketUserAccountContactTypes).toHaveProperty('WWW');
        expect(PocketUserAccountContactTypes).toHaveProperty('APP');
        expect(PocketUserAccountContactTypes).toHaveProperty('PHYSICAL');
        expect(PocketUserAccountContactTypes).toHaveProperty('OTHER');
    });
});

describe('PocketUserAccountVerifiedContact', () => {
    it('should have the correct properties', () => {
        const verifiedContact: PocketUserAccountVerifiedContact = {
            verifiedAt: '2023-01-01T00:00:00Z',
            verifiedBy: 'test-user-001',
            verificationMethod: 'email',
            verificationStatus: 'verified',
            verificationProof: 'proof',
            verificationData: 'data'
        };

        expect(verifiedContact).toHaveProperty('verifiedAt');
        expect(verifiedContact).toHaveProperty('verifiedBy');
        expect(verifiedContact).toHaveProperty('verificationMethod');
        expect(verifiedContact).toHaveProperty('verificationStatus');
        expect(verifiedContact).toHaveProperty('verificationProof');
        expect(verifiedContact).toHaveProperty('verificationData');
    });
});

describe('PocketUserAccountTimestamps', () => {
    it('should have the correct properties', () => {
        const timestamps: PocketUserAccountTimestamps = {
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: null,
            deletedAt: null,
            lastLoginAt: null,
            lastActivityAt: null
        };

        expect(timestamps).toHaveProperty('createdAt');
        expect(timestamps).toHaveProperty('updatedAt');
        expect(timestamps).toHaveProperty('deletedAt');
        expect(timestamps).toHaveProperty('lastLoginAt');
        expect(timestamps).toHaveProperty('lastActivityAt');
    });
});


