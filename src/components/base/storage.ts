import { Argument, Parameter } from "@components/config";
import { BaseIdentifier, BaseObjectType } from "@templates/v0";
import { BaseStorage, BaseStorageLocation, BaseStorageLocations } from "@templates/v0/base/storage";
import { MerkleTree } from "@utilities/merkleTree";


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
interface PocketStorageOptions
<
    L extends BaseStorageLocation = BaseStorageLocations.MEMORY
> 
    extends
        Record<'location', L>,
        Record<'allowDuplicates', boolean>,
        Record<'allowEmpty', boolean>,
        Record<'maxSize', number | undefined>
{}



/**
 * PocketStorage is a generic class that represents a storage object.
 * It implements the BaseStorage interface and provides methods to manage the storage.
 * 
 * @template S The type of the storage item.
 * @template O The type of the object.
 * @template L The type of the storage location.
 */
class PocketStorage
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

    constructor(
        items: Array<S> = [],
        {
            location,
            allowDuplicates = false,
            allowEmpty = false,
            maxSize = 0
        }: PocketStorageOptions<L>
    ) {
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

        if (
            this.maxSize !== undefined
            && this.items.length >= this.maxSize
            && this.maxSize > 0
        ) {
            throw new Error("PocketStorage is full");
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

    public async buildMerkleTree(): Promise<MerkleTree> {
        const leaves = this.items.map(item => item.dataString);
        const tree = new MerkleTree(leaves);
        await tree.build();
        return tree;
    }

    public async getMerkleRoot(): Promise<string> {
        const tree = await this.buildMerkleTree();
        return tree.getRoot();
    }
}


export {
    PocketStorage,
    type StorageTypes,
    type PocketStorageOptions
}