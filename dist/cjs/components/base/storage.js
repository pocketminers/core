"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
class Storage {
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
    constructor({ location, items = [], allowDuplicates = false, allowEmpty = false, maxSize }) {
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
        if (this.maxSize !== undefined && this.items.length >= this.maxSize) {
            throw new Error("Storage is full");
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
}
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map