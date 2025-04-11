var Storage = /** @class */ (function () {
    function Storage(_a) {
        var location = _a.location, _b = _a.items, items = _b === void 0 ? [] : _b, _c = _a.allowDuplicates, allowDuplicates = _c === void 0 ? false : _c, _d = _a.allowEmpty, allowEmpty = _d === void 0 ? false : _d, maxSize = _a.maxSize;
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
    Storage.prototype.addItem = function (item) {
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
    };
    /**
     * Removes an item from the storage.
     * @param itemName The name of the item to remove.
     */
    Storage.prototype.removeItem = function (itemId) {
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
    Storage.prototype.getItem = function (itemId) {
        return this.items.find(function (item) { return item.metadata.id.value === itemId.value; });
    };
    /**
     * Clears the storage.
     */
    Storage.prototype.clear = function () {
        this.items = [];
    };
    /**
     * Gets the size of the storage.
     * @returns The size of the storage.
     */
    Storage.prototype.getSize = function () {
        return this.items.length;
    };
    /**
     * Gets the location of the storage.
     * @returns The location of the storage.
     */
    Storage.prototype.getLocation = function () {
        return this.location;
    };
    /**
     * Gets the type of the storage.
     * @returns The type of the storage.
     */
    Storage.prototype.getType = function () {
        var _a, _b;
        return (_b = (_a = this.items[0]) === null || _a === void 0 ? void 0 : _a.metadata.type) !== null && _b !== void 0 ? _b : "UNKNOWN";
    };
    return Storage;
}());
export { Storage, };
//# sourceMappingURL=storage.js.map