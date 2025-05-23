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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { MultiHashUtilities } from "./multiHash.js";
var MerkleTree = /** @class */ (function () {
    function MerkleTree(leaves) {
        this.leaves = leaves;
        this.tree = [];
    }
    MerkleTree.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.leaves.length === 0) {
                            throw new Error("No leaves to build the tree");
                        }
                        if (!(this.leaves.length === 1)) return [3 /*break*/, 2];
                        _b = (_a = this.tree).push;
                        return [4 /*yield*/, MultiHashUtilities.hashString(this.leaves[0])];
                    case 1:
                        _b.apply(_a, [[_c.sent()]]);
                        return [2 /*return*/];
                    case 2:
                        if (this.leaves.length % 2 !== 0) {
                            this.leaves.push(this.leaves[this.leaves.length - 1]);
                        }
                        return [4 /*yield*/, this.buildTree()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MerkleTree.prototype.buildTree = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentLevel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.leaves.map(function (item) { return MultiHashUtilities.hashString(item); }))];
                    case 1:
                        currentLevel = _a.sent();
                        this.tree.push(currentLevel);
                        _a.label = 2;
                    case 2:
                        if (!(currentLevel.length > 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.hashLevel(currentLevel)];
                    case 3:
                        currentLevel = _a.sent();
                        this.tree.push(currentLevel);
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerkleTree.prototype.hashLevel = function (level) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedLevel, i, combinedHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hashedLevel = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < level.length)) return [3 /*break*/, 5];
                        if (!(i + 1 < level.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, MultiHashUtilities.hashString(level[i] + level[i + 1])];
                    case 2:
                        combinedHash = _a.sent();
                        hashedLevel.push(combinedHash);
                        return [3 /*break*/, 4];
                    case 3:
                        hashedLevel.push(level[i]);
                        _a.label = 4;
                    case 4:
                        i += 2;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, hashedLevel];
                }
            });
        });
    };
    MerkleTree.prototype.getRoot = function () {
        return this.tree[this.tree.length - 1][0];
    };
    MerkleTree.prototype.getProof = function (leaf) {
        var leafIndex = this.leaves.indexOf(leaf);
        if (leafIndex === -1) {
            throw new Error("Leaf not found in the tree");
        }
        var proof = [];
        var currentLevelIndex = 0;
        for (var i = leafIndex; i < this.tree.length - 1; i++) {
            var isLeftNode = i % 2 === 0;
            var siblingIndex = isLeftNode ? i + 1 : i - 1;
            proof.push(this.tree[currentLevelIndex][siblingIndex]);
            currentLevelIndex++;
        }
        return proof;
    };
    MerkleTree.prototype.verifyProof = function (leaf, proof, root) {
        return __awaiter(this, void 0, void 0, function () {
            var currentHash, proof_1, proof_1_1, siblingHash, combinedHash, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, MultiHashUtilities.generateMultihash(leaf)];
                    case 1:
                        currentHash = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        proof_1 = __values(proof), proof_1_1 = proof_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!proof_1_1.done) return [3 /*break*/, 6];
                        siblingHash = proof_1_1.value;
                        combinedHash = currentHash < siblingHash ? "".concat(currentHash).concat(siblingHash) : "".concat(siblingHash).concat(currentHash);
                        return [4 /*yield*/, MultiHashUtilities.generateMultihash(combinedHash)];
                    case 4:
                        currentHash = _b.sent();
                        _b.label = 5;
                    case 5:
                        proof_1_1 = proof_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (proof_1_1 && !proof_1_1.done && (_a = proof_1.return)) _a.call(proof_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, currentHash === root];
                }
            });
        });
    };
    MerkleTree.prototype.getTree = function () {
        return this.tree;
    };
    MerkleTree.prototype.getLeaves = function () {
        return this.leaves;
    };
    MerkleTree.prototype.getLeavesCount = function () {
        return this.leaves.length;
    };
    MerkleTree.prototype.getTreeHeight = function () {
        return this.tree.length;
    };
    MerkleTree.prototype.getLevel = function (level) {
        if (level < 0 || level >= this.tree.length) {
            throw new Error("Invalid level");
        }
        return this.tree[level];
    };
    return MerkleTree;
}());
export { MerkleTree };
//# sourceMappingURL=merkleTree.js.map