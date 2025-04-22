import { Argument, Parameter } from "../config/index.js";
import { BaseIdentifier, BaseObjectType } from "../../templates/v0/index.js";
import { BaseStorage, BaseStorageLocation, BaseStorageLocations } from "../../templates/v0/base/storage.js";
import { MerkleTree } from "../../utilities/merkleTree.js";
/**
 * StorageTypes is a generic type that represents the types of storage items.
 * Currently, it can be either an Argument or a Parameter.
 */
type StorageTypes = Argument<any, any> | Parameter<any, any>;
/**
 * PocketStorageOptions is a generic type that represents the options for the PocketStorage class.
 * It extends the BaseStorageOptions interface and provides additional properties.
 *
 * @template L The type of the storage location.
 */
interface PocketStorageOptions<L extends BaseStorageLocation = BaseStorageLocations.MEMORY> extends Record<'location', L>, Record<'allowDuplicates', boolean>, Record<'allowEmpty', boolean>, Record<'maxSize', number | undefined> {
}
/**
 * PocketStorage is a generic class that represents a storage object.
 * It implements the BaseStorage interface and provides methods to manage the storage.
 *
 * @template S The type of the storage item.
 * @template O The type of the object.
 * @template L The type of the storage location.
 */
declare class PocketStorage<S extends StorageTypes, O extends BaseObjectType, L extends BaseStorageLocation = BaseStorageLocations.MEMORY> implements BaseStorage<S, O, L> {
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
    constructor(items: Array<S>, { location, allowDuplicates, allowEmpty, maxSize }: PocketStorageOptions<L>);
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
    buildMerkleTree(): Promise<MerkleTree>;
    getMerkleRoot(): Promise<string>;
}
export { PocketStorage, type StorageTypes, type PocketStorageOptions };
//# sourceMappingURL=storage.d.ts.map