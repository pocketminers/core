import { MultiHashUtilities } from "./multiHash";

class MerkleTree {
    private leaves: string[];
    private tree: string[][];

    constructor(leaves: string[]) {
        this.leaves = leaves;
        this.tree = [];
    }

    public async build(): Promise<void> {
        if (this.leaves.length === 0) {
            throw new Error("No leaves to build the tree");
        }
        if (this.leaves.length === 1) {
            this.tree.push([await MultiHashUtilities.hashString(this.leaves[0])]);
            return;
        }
        if (this.leaves.length % 2 !== 0) {
            this.leaves.push(this.leaves[this.leaves.length - 1]);
        }
        await this.buildTree();
    }

    private async buildTree(): Promise<void> {
        let currentLevel = await Promise.all(this.leaves.map(item => MultiHashUtilities.hashString(item)));
        this.tree.push(currentLevel);

        while (currentLevel.length > 1) {
            currentLevel = await this.hashLevel(currentLevel);
            this.tree.push(currentLevel);
        }
    }

    private async hashLevel(level: string[]): Promise<string[]> {
        const hashedLevel: string[] = [];

        for (let i = 0; i < level.length; i += 2) {
            if (i + 1 < level.length) {
                const combinedHash = await MultiHashUtilities.hashString(level[i] + level[i + 1]);
                hashedLevel.push(combinedHash);
            } else {
                hashedLevel.push(level[i]);
            }
        }

        return hashedLevel;
    }


    public getRoot(): string {
        return this.tree[this.tree.length - 1][0];
    }

    public getProof(leaf: string): string[] {
        const leafIndex = this.leaves.indexOf(leaf);
        if (leafIndex === -1) {
            throw new Error("Leaf not found in the tree");
        }

        const proof: string[] = [];
        let currentLevelIndex = 0;

        for (let i = leafIndex; i < this.tree.length - 1; i++) {
            const isLeftNode = i % 2 === 0;
            const siblingIndex = isLeftNode ? i + 1 : i - 1;
            proof.push(this.tree[currentLevelIndex][siblingIndex]);
            currentLevelIndex++;
        }

        return proof;
    }
    public async verifyProof(leaf: string, proof: string[], root: string): Promise<boolean> {
        let currentHash = await MultiHashUtilities.generateMultihash(leaf);

        for (const siblingHash of proof) {
            const combinedHash = currentHash < siblingHash ? `${currentHash}${siblingHash}` : `${siblingHash}${currentHash}`;
            currentHash = await MultiHashUtilities.generateMultihash(combinedHash);
        }

        return currentHash === root;
    }

    public getTree(): string[][] {
        return this.tree;
    }

    public getLeaves(): string[] {
        return this.leaves;
    }

    public getLeavesCount(): number {
        return this.leaves.length;
    }

    public getTreeHeight(): number {
        return this.tree.length;
    }

    public getLevel(level: number): string[] {
        if (level < 0 || level >= this.tree.length) {
            throw new Error("Invalid level");
        }
        return this.tree[level];
    }
}

export { MerkleTree };