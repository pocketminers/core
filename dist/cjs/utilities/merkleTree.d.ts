declare class MerkleTree {
    private leaves;
    private tree;
    constructor(leaves: string[]);
    build(): Promise<void>;
    private buildTree;
    private hashLevel;
    getRoot(): string;
    getProof(leaf: string): string[];
    verifyProof(leaf: string, proof: string[], root: string): Promise<boolean>;
    getTree(): string[][];
    getLeaves(): string[];
    getLeavesCount(): number;
    getTreeHeight(): number;
    getLevel(level: number): string[];
}
export { MerkleTree };
//# sourceMappingURL=merkleTree.d.ts.map