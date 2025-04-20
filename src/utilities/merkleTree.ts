import { MultiHashUtilities } from "./multiHash";

class MerkleTree {
    private leaves: string[];
    private tree: string[][];

    constructor(leaves: string[]) {
        this.leaves = leaves;
        this.tree = [];
        this.buildTree();
    }

    private async buildTree(): Promise<void> {
        let currentLevel = await Promise.all(this.leaves.map(item => item.hashData()));
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
                const combinedHash = await MerkleTree.hashData(level[i] + level[i + 1]);
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
    public verifyProof(leaf: string, proof: string[], root: string): boolean {
        let currentHash = MultiHashUtilities.generateMultihash(leaf);

        for (const siblingHash of proof) {
            const combinedHash = currentHash < siblingHash ? `${currentHash}${siblingHash}` : `${siblingHash}${currentHash}`;
            currentHash = MultiHashUtilities.generateMultihash(combinedHash);
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