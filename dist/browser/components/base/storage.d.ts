import { Argument, Parameter } from "../config";
import { BaseIdentifier, BaseObjectType } from "../../templates/v0";
import { BaseStorage, BaseStorageLocation, BaseStorageLocations } from "../../templates/v0/base/storage";
type StorageTypes = Argument<any> | Parameter<any>;
declare class Storage<S extends StorageTypes, O extends BaseObjectType, L extends BaseStorageLocation = BaseStorageLocations.MEMORY> implements BaseStorage<S, O, L> {
    /**
     * The location of the storage item.
     */
    location: L;
    /**
     * The items in the storage.
     */
    items: Array<S>;
    /**
     * Whether duplicates are allowed in the storage.
     */
    allowDuplicates: boolean;
    /**
     * Whether empty items are allowed in the storage.
     */
    allowEmpty: boolean;
    /**
     * The maximum size of the storage.
     */
    maxSize: number | undefined;
    constructor({ location, items, allowDuplicates, allowEmpty, maxSize }: {
        location: L;
        items?: Array<S>;
        allowDuplicates?: boolean;
        allowEmpty?: boolean;
        maxSize?: number;
    });
    /**
     * Adds an item to the storage.
     * @param item The item to add.
     */
    addItem(item: S): void;
    /**
     * Removes an item from the storage.
     * @param itemName The name of the item to remove.
     */
    removeItem(itemId: BaseIdentifier<any>): void;
    /**
     * Gets an item from the storage.
     * @param itemName The name of the item to get.
     * @returns The item or undefined if not found.
     */
    getItem(itemId: BaseIdentifier<any>): S | undefined;
    /**
     * Clears the storage.
     */
    clear(): void;
    /**
     * Gets the size of the storage.
     * @returns The size of the storage.
     */
    getSize(): number;
    /**
     * Gets the location of the storage.
     * @returns The location of the storage.
     */
    getLocation(): L;
    /**
     * Gets the type of the storage.
     * @returns The type of the storage.
     */
    getType(): string;
}
export { Storage, type StorageTypes, };
//# sourceMappingURL=storage.d.ts.map