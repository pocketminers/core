import { PocketStorage } from "../src/components/base/storage";
import { BaseIdentifier, BaseIdentifierTypes } from "@templates/v0";
import { BaseStorageLocations } from "@templates/v0/base/storage";
import { Metadata } from "@components/metadata";

describe("PocketStorage", () => {
    let storage: PocketStorage<any, any>;

    beforeEach(() => {
        storage = new PocketStorage({
            location: BaseStorageLocations.MEMORY,
            allowDuplicates: false,
            allowEmpty: false,
            maxSize: 5,
        });
    });

    it("should initialize with default values", () => {
        expect(storage.getLocation()).toBe(BaseStorageLocations.MEMORY);
        expect(storage.getSize()).toBe(0);
        expect(storage.allowDuplicates).toBe(false);
        expect(storage.allowEmpty).toBe(false);
        expect(storage.maxSize).toBe(5);
    });

    it("should add an item to the storage", () => {
        const item = { data: "hello", metadata: new Metadata({id: {value: 1, type_: BaseIdentifierTypes.Number}}), isEmpty: () => false };
        storage.addItem(item);
        expect(storage.getSize()).toBe(1);
        console.log(storage.items);
        expect(storage.getItem({value: 1, type_: BaseIdentifierTypes.Number})).toEqual(item);
    });

    it("should throw an error when adding a duplicate item", () => {
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        storage.addItem(item);
        expect(() => storage.addItem(item)).toThrow("Item already exists");
    });

    it("should throw an error when adding an empty item", () => {
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => true };
        expect(() => storage.addItem(item)).toThrow("Item is empty");
    });

    it("should throw an error when storage is full", () => {
        for (let i = 0; i < 5; i++) {
            storage.addItem({ metadata: { id: `${i}`, type: "test" }, isEmpty: () => false });
        }
        expect(() => storage.addItem({ metadata: { id: "6", type: "test" }, isEmpty: () => false })).toThrow("PocketStorage is full");
    });

    it("should remove an item from the storage", () => {
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        storage.addItem(item);
        storage.removeItem({value: 1, type_: BaseIdentifierTypes.Number});
        expect(storage.getSize()).toBe(0);
        expect(storage.getItem({value: 1, type_: BaseIdentifierTypes.Number})).toBeUndefined();
    });

    it("should throw an error when removing a non-existent item", () => {
        expect(() => storage.removeItem({value: 1, type_: BaseIdentifierTypes.Number})).toThrow("Item not found");
    });

    it("should clear the storage", () => {
        const item1 = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        const item2 = { metadata: { id: "2", type: "test" }, isEmpty: () => false };
        storage.addItem(item1);
        storage.addItem(item2);
        storage.clear();
        expect(storage.getSize()).toBe(0);
    });

    it("should return the correct storage type", () => {
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        storage.addItem(item);
        expect(storage.getType()).toBe("UNKNOWN");
    });

    it("should return 'UNKNOWN' when storage is empty", () => {
        expect(storage.getType()).toBe("UNKNOWN");
    });

    it('should not allow empty items', () => {
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => true };
        expect(() => storage.addItem(item)).toThrow("Item is empty");
    });

    it('should allow empty items when allowEmpty is true', () => {
        storage.allowEmpty = true;
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => true };
        storage.addItem(item);
        expect(storage.getSize()).toBe(1);
    });

    it('should allow duplicates when allowDuplicates is true', () => {
        storage.allowDuplicates = true;
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        storage.addItem(item);
        storage.addItem(item);
        expect(storage.getSize()).toBe(2);
    });

    it('should throw an error when adding an item that exceeds maxSize', () => {
        storage.maxSize = 1;
        const item1 = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        const item2 = { metadata: { id: { value: 2, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        storage.addItem(item1);
        expect(() => storage.addItem(item2)).toThrow("PocketStorage is full");
    });

    it('should return the correct size of the storage', () => {
        expect(storage.getSize()).toBe(0);
        const item = { metadata: { id: { value: 1, type_: BaseIdentifierTypes.Number} }, isEmpty: () => false };
        storage.addItem(item);
        console.log(JSON.stringify(storage.items));
        expect(storage.getSize()).toBe(1);
    });
});