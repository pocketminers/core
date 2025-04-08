// import {
//     type PocketUserAccount,
//     type PocketUserAccountContact,
//     type PocketUserAccountContactType,
//     type PocketUserAccountVerifiedContact,
//     type PocketUserAccountTimestamps,
//     PocketUserAccountContactTypes,
//     PocketUserAccountStorageItem,
//     PocketUserAccountStorageTypes,
//     PocketUserAccountStorage
// } from '../src/templates/v0/user/account';


// describe('PocketUserAccount', () => {
//     it('should have the correct properties', () => {
//         const account: PocketUserAccount = {
//             id: '123',
//             name: 'John Doe',
//             contacts: [],
//             storage: [],
//             metadata: {
//                 name: 'John Doe',
//                 description: 'A test user account',
//                 annotations: {},
//                 labels: {}
//             },
//             timestamps: {
//                 createdAt: '2023-01-01T00:00:00Z',
//                 updatedAt: null,
//                 deletedAt: null,
//                 lastLoginAt: null,
//                 lastActivityAt: null
//             }
//         };

//         expect(account).toHaveProperty('id');
//         expect(account).toHaveProperty('name');
//         expect(account).toHaveProperty('contacts');
//         expect(account).toHaveProperty('timestamps');
//     });
// });


// describe('PocketUserAccountContact', () => {
//     it('should have the correct properties', () => {
//         const contact: PocketUserAccountContact = {
//             type: PocketUserAccountContactTypes.EMAIL,
//             value: 'test-user-001',
//             verified: false,
//             verification: null
//         };
//         expect(contact).toHaveProperty('type');
//         expect(contact).toHaveProperty('value');
//         expect(contact).toHaveProperty('verified');
//         expect(contact).toHaveProperty('verification');
//         expect(contact.type).toBe(PocketUserAccountContactTypes.EMAIL);
//         expect(contact.value).toBe('test-user-001');
//         expect(contact.verified).toBe(false);
//         expect(contact.verification).toBe(null);
//     });
//     it('should have the correct type', () => {
//         const contact: PocketUserAccountContact = {
//             type: 'EMAIL',
//             value: 'test-user-001',
//             verified: false,
//             verification: null
//         };
//         expect(contact.type).toBe(PocketUserAccountContactTypes.EMAIL);
//     });
//     it('should have the correct value', () => {
//         const contact: PocketUserAccountContact = {
//             type: 'EMAIL',
//             value: 'test-user-001',
//             verified: false,
//             verification: null
//         };
//         expect(contact.value).toBe('test-user-001');
//     });
//     it('should have the correct verified status', () => {
//         const contact: PocketUserAccountContact = {
//             type: 'EMAIL',
//             value: 'test-user-001',
//             verified: false,
//             verification: null
//         };
//         expect(contact.verified).toBe(false);
//     });
//     it('should have the correct verification', () => {
//         const contact: PocketUserAccountContact = {
//             type: 'EMAIL',
//             value: 'test-user-001',
//             verified: false,
//             verification: null
//         };
//         expect(contact.verification).toBe(null);
//     });
// });

// describe('PocketUserAccountContactTypes', () => {
//     it('should have the correct types', () => {
//         expect(PocketUserAccountContactTypes).toHaveProperty('EMAIL');
//         expect(PocketUserAccountContactTypes).toHaveProperty('PHONE');
//         expect(PocketUserAccountContactTypes).toHaveProperty('ADDRESS');
//         expect(PocketUserAccountContactTypes).toHaveProperty('SOCIAL');
//         expect(PocketUserAccountContactTypes).toHaveProperty('DID');
//         expect(PocketUserAccountContactTypes).toHaveProperty('WWW');
//         expect(PocketUserAccountContactTypes).toHaveProperty('APP');
//         expect(PocketUserAccountContactTypes).toHaveProperty('PHYSICAL');
//         expect(PocketUserAccountContactTypes).toHaveProperty('OTHER');
//     });
// });

// describe('PocketUserAccountVerifiedContact', () => {
//     it('should have the correct properties', () => {
//         const verifiedContact: PocketUserAccountVerifiedContact = {
//             verifiedAt: '2023-01-01T00:00:00Z',
//             verifiedBy: 'test-user-001',
//             verificationMethod: 'email',
//             verificationStatus: 'verified',
//             verificationProof: 'proof',
//             verificationData: 'data'
//         };

//         expect(verifiedContact).toHaveProperty('verifiedAt');
//         expect(verifiedContact).toHaveProperty('verifiedBy');
//         expect(verifiedContact).toHaveProperty('verificationMethod');
//         expect(verifiedContact).toHaveProperty('verificationStatus');
//         expect(verifiedContact).toHaveProperty('verificationProof');
//         expect(verifiedContact).toHaveProperty('verificationData');
//     });
// });

// describe('PocketUserAccountTimestamps', () => {
//     it('should have the correct properties', () => {
//         const timestamps: PocketUserAccountTimestamps = {
//             createdAt: '2023-01-01T00:00:00Z',
//             updatedAt: null,
//             deletedAt: null,
//             lastLoginAt: null,
//             lastActivityAt: null
//         };

//         expect(timestamps).toHaveProperty('createdAt');
//         expect(timestamps).toHaveProperty('updatedAt');
//         expect(timestamps).toHaveProperty('deletedAt');
//         expect(timestamps).toHaveProperty('lastLoginAt');
//         expect(timestamps).toHaveProperty('lastActivityAt');
//     });
// });
// describe('PocketMetadataAnnotations', () => {
//     it('should allow key-value pairs with valid types', () => {
//         const annotations: PocketMetadataAnnotations = {
//             key1: 'value1',
//             key2: 123,
//             key3: true,
//             key4: null,
//             key5: { nested: 'object' },
//             key6: ['array', 42, false]
//         };

//         expect(annotations).toHaveProperty('key1', 'value1');
//         expect(annotations).toHaveProperty('key2', 123);
//         expect(annotations).toHaveProperty('key3', true);
//         expect(annotations).toHaveProperty('key4', null);
//         expect(annotations).toHaveProperty('key5', { nested: 'object' });
//         expect(annotations).toHaveProperty('key6', ['array', 42, false]);
//     });
// });

// describe('PocketMetadataLabels', () => {
//     it('should allow tags and key-value pairs', () => {
//         const labels: PocketMetadataLabels = {
//             tags: ['tag1', 42],
//             customKey: 'customValue'
//         };

//         expect(labels).toHaveProperty('tags', ['tag1', 42]);
//         expect(labels).toHaveProperty('customKey', 'customValue');
//     });
// });

// describe('PocketMetadata', () => {
//     it('should have the correct properties', () => {
//         const metadata: PocketMetadata = {
//             name: 'Test Metadata',
//             description: 'Metadata description',
//             annotations: { key: 'value' },
//             labels: { tags: ['tag1'], customKey: 'customValue' }
//         };

//         expect(metadata).toHaveProperty('name', 'Test Metadata');
//         expect(metadata).toHaveProperty('description', 'Metadata description');
//         expect(metadata).toHaveProperty('annotations', { key: 'value' });
//         expect(metadata).toHaveProperty('labels', { tags: ['tag1'], customKey: 'customValue' });
//     });
// });

// describe('PocketUserAccountStorageItem', () => {
//     it('should have the correct properties', () => {
//         const storageItem: PocketUserAccountStorageItem = {
//             name: 'File1',
//             description: 'A test file',
//             type: 'FILE',
//             size: 1024,
//             value: 'file-content'
//         };

//         expect(storageItem).toHaveProperty('name', 'File1');
//         expect(storageItem).toHaveProperty('description', 'A test file');
//         expect(storageItem).toHaveProperty('type', 'FILE');
//         expect(storageItem).toHaveProperty('size', 1024);
//         expect(storageItem).toHaveProperty('value', 'file-content');
//     });
// });

// describe('PocketUserAccountStorageTypes', () => {
//     it('should have the correct storage types', () => {
//         expect(PocketUserAccountStorageTypes).toHaveProperty('FILE');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('DIRECTORY');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('IPFS_FILE_CID');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('IPFS_DIRECTORY_CID');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('DATABASE');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('CACHE');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('MEMORY');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('TEMPORARY');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('COOKIE');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('LOCAL_STORAGE');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('SESSION_STORAGE');
//         expect(PocketUserAccountStorageTypes).toHaveProperty('OTHER');
//     });
// });

// describe('PocketUserAccountStorage', () => {
//     it('should have the correct properties', () => {
//         const storage: PocketUserAccountStorage = {
//             name: 'User Storage',
//             description: 'Storage description',
//             type: 'FILE',
//             size: 2048,
//             items: [
//                 {
//                     name: 'File1',
//                     description: 'A test file',
//                     type: 'FILE',
//                     size: 1024,
//                     value: 'file-content'
//                 }
//             ]
//         };

//         expect(storage).toHaveProperty('name', 'User Storage');
//         expect(storage).toHaveProperty('description', 'Storage description');
//         expect(storage).toHaveProperty('type', 'FILE');
//         expect(storage).toHaveProperty('size', 2048);
//         expect(storage.items).toHaveLength(1);
//         expect(storage.items[0]).toHaveProperty('name', 'File1');
//     });
// });



