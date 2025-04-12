/**
 * PocketStorage is a generic class that represents a storage object.
 * It implements the BaseStorage interface and provides methods to manage the storage.
 *
 * @template S The type of the storage item.
 * @template O The type of the object.
 * @template L The type of the storage location.
 */
var PocketStorage = /** @class */ (function () {
    function PocketStorage(items, _a) {
        if (items === void 0) { items = []; }
        var location = _a.location, _b = _a.allowDuplicates, allowDuplicates = _b === void 0 ? false : _b, _c = _a.allowEmpty, allowEmpty = _c === void 0 ? false : _c, _d = _a.maxSize, maxSize = _d === void 0 ? 0 : _d;
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
    PocketStorage.prototype.addItem = function (item) {
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
    };
    /**
     * Removes an item from the storage.
     * @param itemName The name of the item to remove.
     */
    PocketStorage.prototype.removeItem = function (itemId) {
        var index = this.items.findIndex(function (item) { return item.metadata.id.value === itemId.value; });
        if (index === -1) {
            throw new Error("Item not found");
        }
        this.items.splice(index, 1);
    };
    /**
     * Gets an item from the storage.
     * @param itemName The name of the item to get.
     * @returns The item or undefined if not found.
     */
    PocketStorage.prototype.getItem = function (itemId) {
        return this.items.find(function (item) { return item.metadata.id.value === itemId.value; });
    };
    /**
     * Clears the storage.
     */
    PocketStorage.prototype.clear = function () {
        this.items = [];
    };
    /**
     * Gets the size of the storage.
     * @returns The size of the storage.
     */
    PocketStorage.prototype.getSize = function () {
        return this.items.length;
    };
    /**
     * Gets the location of the storage.
     * @returns The location of the storage.
     */
    PocketStorage.prototype.getLocation = function () {
        return this.location;
    };
    /**
     * Gets the type of the storage.
     * @returns The type of the storage.
     */
    PocketStorage.prototype.getType = function () {
        var _a, _b;
        return (_b = (_a = this.items[0]) === null || _a === void 0 ? void 0 : _a.metadata.type) !== null && _b !== void 0 ? _b : "UNKNOWN";
    };
    return PocketStorage;
}());
export { PocketStorage };
//# sourceMappingURL=storage.js.map