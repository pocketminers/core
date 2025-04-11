import { Argument, Parameter } from "@components/config";
import { BaseIdentifier, BaseObjectType } from "@templates/v0";
import { BaseStorage, BaseStorageLocation, BaseStorageLocations } from "@templates/v0/base/storage";

type StorageTypes = Argument<any> | Parameter<any>;

class Storage
<
    S extends StorageTypes,
    O extends BaseObjectType,
    L extends BaseStorageLocation = BaseStorageLocations.MEMORY
>
    implements BaseStorage<S, O, L>
{
    /**
     * The location of the storage item.
     */
    public location: L;

    /**
     * The items in the storage.
     */
    public items: Array<S>;

    /**
     * Whether duplicates are allowed in the storage.
     */
    public allowDuplicates: boolean;

    /**
     * Whether empty items are allowed in the storage.
     */
    public allowEmpty: boolean;

    /**
     * The maximum size of the storage.
     */
    public maxSize: number | undefined;

    constructor({
        location,
        items = [],
        allowDuplicates = false,
        allowEmpty = false,
        maxSize
    }: {
        location: L;
        items?: Array<S>;
        allowDuplicates?: boolean;
        allowEmpty?: boolean;
        maxSize?: number;
    }) {
        this.location = location;
        this.items = items;
        this.allowDuplicates = allowDuplicates;
        this.allowEmpty = allowEmpty;
        this.maxSize = maxSize;
    }

    /**
     * Adds an item to the storage.
     * @param item The item to add.
     */
    public addItem(item: S): void {
        if (this.allowEmpty === false && item.isEmpty()) {
            throw new Error("Item is empty");
        }

        if (this.allowDuplicates === false && this.items.includes(item)) {
            throw new Error("Item already exists");
        }

        if (this.maxSize !== undefined && this.items.length >= this.maxSize) {
            throw new Error("Storage is full");
        }

        this.items.push(item);
    }

    /**
     * Removes an item from the storage.
     * @param itemName The name of the item to remove.
     */
    public removeItem(itemId: BaseIdentifier<any>): void {
        const index = this.items.findIndex(item => item.metadata.id.value === itemId.value);
        if (index === -1) {
            throw new Error("Item not found");
        }
        this.items.splice(index, 1);
    }

    /**
     * Gets an item from the storage.
     * @param itemName The name of the item to get.
     * @returns The item or undefined if not found.
     */
    public getItem(itemId: BaseIdentifier<any>): S | undefined {
        return this.items.find(item => item.metadata.id.value === itemId.value);
    }

    /**
     * Clears the storage.
     */
    public clear(): void {
        this.items = [];
    }

    /**
     * Gets the size of the storage.
     * @returns The size of the storage.
     */
    public getSize(): number {
        return this.items.length;
    }

    /**
     * Gets the location of the storage.
     * @returns The location of the storage.
     */
    public getLocation(): L {
        return this.location;
    }

    /**
     * Gets the type of the storage.
     * @returns The type of the storage.
     */
    public getType(): string {
        return this.items[0]?.metadata.type ?? "UNKNOWN";
    }
}


export {
    Storage,
    type StorageTypes,
}