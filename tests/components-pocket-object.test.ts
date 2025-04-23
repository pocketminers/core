import { PocketObject } from "@components/object";
import { Metadata } from "@components/metadata";


describe('PocketObject', () => {
    it('should create a PocketObject with data and metadata', () => {
        const data = { key: 'value' };
        const metadata = Metadata.createDefaultMetadata();

        const pocketObject = new PocketObject({data, metadata});

        expect(pocketObject.data).toEqual(data);
        expect(pocketObject.metadata).toEqual(metadata);
    });

    it('should create a PocketObject without metadata', () => {
        const data = { key: 'value' };

        const pocketObject = new PocketObject({data});

        expect(pocketObject.data).toEqual(data);
        expect(pocketObject.metadata?.timestamps?.created).toBeDefined();
        expect(pocketObject.metadata?.timestamps?.updated).toBeDefined();
    });

    it('should freeze the PocketObject instance', () => {
        const data = { key: 'value' };
        const pocketObject = new PocketObject({data});

        expect(Object.isFrozen(pocketObject)).toBe(true);
        expect(Object.isFrozen(pocketObject.data)).toBe(true);
        expect(Object.isFrozen(pocketObject.metadata)).toBe(true);
    });

    it('should return a string representation of the data', () => {
        const data = { key: 'value' };
        const pocketObject = new PocketObject({data});

        expect(pocketObject.dataString).toBe(JSON.stringify(data));
    });
    
    it('should return a string representation of the metadata', () => {
        const data = { key: 'value' };
        const metadata = Metadata.createDefaultMetadata();
        const pocketObject = new PocketObject({data, metadata});

        expect(pocketObject.metadataString).toBe(JSON.stringify(metadata));
    });

    it('should return a string representation of the object', () => {
        const data = { key: 'value' };
        const metadata = Metadata.createDefaultMetadata();
        const pocketObject = new PocketObject({data, metadata});

        expect(pocketObject.objectString).toBe(JSON.stringify(pocketObject));
    });

    it('should throw an error if data is undefined', () => {
        try {
            // @ts-ignore
            new PocketObject(undefined);
        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toBe("Cannot destructure property 'data' of 'undefined' as it is undefined.");
        }
    });

    it('should return the object type from metadata', () => {
        const data = { key: 'value' };
        const metadata = Metadata.createDefaultMetadata<
            'Undefined',
            'Undefined'
        >();
        const pocketObject = new PocketObject({data, metadata});

        expect(pocketObject.objectType).toBe(metadata.labels?.type);
    });

    it('should throw an error if metadata is not an instance of MetadataFActory', () => {
        const data = { key: 'value' };
        const metadata = { key: 'value' }; // Not a MetadataFActory instance

        try {
            // @ts-ignore
            new PocketObject({data, metadata});
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
            expect(error).toBeDefined();
            expect(error.message).toBe("MetadataFActory must be an instance of MetadataFActory");
        }
    });


});