import { PocketObject } from "@components/base/object";
import { Metadata } from "@components/metadata";



describe('PocketObject', () => {
    it('should create a PocketObject with data and metadata', () => {
        const data = { key: 'value' };
        const metadata = Metadata.createDefaultMetadata();

        const pocketObject = new PocketObject(data, metadata);

        expect(pocketObject.data).toEqual(data);
        expect(pocketObject.metadata).toEqual(metadata);
    });

    it('should create a PocketObject without metadata', () => {
        const data = { key: 'value' };

        const pocketObject = new PocketObject(data);

        expect(pocketObject.data).toEqual(data);
        expect(pocketObject.metadata?.timestamps?.created).toBeDefined();
        expect(pocketObject.metadata?.timestamps?.updated).toBeDefined();
    });
});