"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTree = void 0;
const multiHash_1 = require("./multiHash.js");
class MerkleTree {
    leaves;
    tree;
    constructor(leaves) {
        this.leaves = leaves;
        this.tree = [];
    }
    async build() {
        if (this.leaves.length === 0) {
            throw new Error("No leaves to build the tree");
        }
        if (this.leaves.length === 1) {
            this.tree.push([await multiHash_1.MultiHashUtilities.hashString(this.leaves[0])]);
            return;
        }
        if (this.leaves.length % 2 !== 0) {
            this.leaves.push(this.leaves[this.leaves.length - 1]);
        }
        await this.buildTree();
    }
    async buildTree() {
        let currentLevel = await Promise.all(this.leaves.map(item => multiHash_1.MultiHashUtilities.hashString(item)));
        this.tree.push(currentLevel);
        while (currentLevel.length > 1) {
            currentLevel = await this.hashLevel(currentLevel);
            this.tree.push(currentLevel);
        }
    }
    async hashLevel(level) {
        const hashedLevel = [];
        for (let i = 0; i < level.length; i += 2) {
            if (i + 1 < level.length) {
                const combinedHash = await multiHash_1.MultiHashUtilities.hashString(level[i] + level[i + 1]);
                hashedLevel.push(combinedHash);
            }
            else {
                hashedLevel.push(level[i]);
            }
        }
        return hashedLevel;
    }
    getRoot() {
        return this.tree[this.tree.length - 1][0];
    }
    getProof(leaf) {
        const leafIndex = this.leaves.indexOf(leaf);
        if (leafIndex === -1) {
            throw new Error("Leaf not found in the tree");
        }
        const proof = [];
        let currentLevelIndex = 0;
        for (let i = leafIndex; i < this.tree.length - 1; i++) {
            const isLeftNode = i % 2 === 0;
            const siblingIndex = isLeftNode ? i + 1 : i - 1;
            proof.push(this.tree[currentLevelIndex][siblingIndex]);
            currentLevelIndex++;
        }
        return proof;
    }
    async verifyProof(leaf, proof, root) {
        let currentHash = await multiHash_1.MultiHashUtilities.generateMultihash(leaf);
        for (const siblingHash of proof) {
            const combinedHash = currentHash < siblingHash ? `${currentHash}${siblingHash}` : `${siblingHash}${currentHash}`;
            currentHash = await multiHash_1.MultiHashUtilities.generateMultihash(combinedHash);
        }
        return currentHash === root;
    }
    getTree() {
        return this.tree;
    }
    getLeaves() {
        return this.leaves;
    }
    getLeavesCount() {
        return this.leaves.length;
    }
    getTreeHeight() {
        return this.tree.length;
    }
    getLevel(level) {
        if (level < 0 || level >= this.tree.length) {
            throw new Error("Invalid level");
        }
        return this.tree[level];
    }
}
exports.MerkleTree = MerkleTree;
//# sourceMappingURL=merkleTree.js.map