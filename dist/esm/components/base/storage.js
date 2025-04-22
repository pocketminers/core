import { MerkleTree } from "../../utilities/merkleTree.js";
/**
 * PocketStorage is a generic class that represents a storage object.
 * It implements the BaseStorage interface and provides methods to manage the storage.
 *
 * @template S The type of the storage item.
 * @template O The type of the object.
 * @template L The type of the storage location.
 */
class PocketStorage {
    /**
     * The location of the storage item.
     */
    location;
    /**
     * The items in the storage.
     */
    items;
    /**
     * Whether duplicates are allowed in the storage.
     */
    allowDuplicates;
    /**
     * Whether empty items are allowed in the storage.
     */
    allowEmpty;
    /**
     * The maximum size of the storage.
     */
    maxSize;
    constructor(items = [], { location, allowDuplicates = false, allowEmpty = false, maxSize = 0 }) {
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
    addItem(item) {
        if (this.allowEmpty === false && item.isEmpty()) {
            throw new Error("Item is empty");
        }
        if (this.allowDuplicates === false && this.items.includes(item)) {
            throw new Error("Item already exists");
        }
        if (this.maxSize !== undefined
            && this.items.length >= this.maxSize
            && this.maxSize > 0) {
            throw new Error("PocketStorage is full");
        }
        this.items.push(item);
    }
    /**
     * Removes an item from the storage.
     * @param itemName The name of the item to remove.
     */
    removeItem(itemId) {
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
    getItem(itemId) {
        return this.items.find(item => item.metadata.id.value === itemId.value);
    }
    /**
     * Clears the storage.
     */
    clear() {
        this.items = [];
    }
    /**
     * Gets the size of the storage.
     * @returns The size of the storage.
     */
    getSize() {
        return this.items.length;
    }
    /**
     * Gets the location of the storage.
     * @returns The location of the storage.
     */
    getLocation() {
        return this.location;
    }
    /**
     * Gets the type of the storage.
     * @returns The type of the storage.
     */
    getType() {
        return this.items[0]?.metadata.type ?? "UNKNOWN";
    }
    async buildMerkleTree() {
        const leaves = this.items.map(item => item.dataString);
        const tree = new MerkleTree(leaves);
        await tree.build();
        return tree;
    }
    async getMerkleRoot() {
        const tree = await this.buildMerkleTree();
        return tree.getRoot();
    }
}
export { PocketStorage };
//# sourceMappingURL=storage.js.map