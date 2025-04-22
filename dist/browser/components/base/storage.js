var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MerkleTree } from "../../utilities/merkleTree.js";
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
    PocketStorage.prototype.buildMerkleTree = function () {
        return __awaiter(this, void 0, void 0, function () {
            var leaves, tree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        leaves = this.items.map(function (item) { return item.dataString; });
                        tree = new MerkleTree(leaves);
                        return [4 /*yield*/, tree.build()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, tree];
                }
            });
        });
    };
    PocketStorage.prototype.getMerkleRoot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildMerkleTree()];
                    case 1:
                        tree = _a.sent();
                        return [2 /*return*/, tree.getRoot()];
                }
            });
        });
    };
    return PocketStorage;
}());
export { PocketStorage };
//# sourceMappingURL=storage.js.map