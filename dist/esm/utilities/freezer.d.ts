/**
 * The Freezer class provides methods to freeze and thaw objects.
 * Freezing an object makes it immutable, while thawing restores its mutability.
 */
declare class Freezer {
    /**
     * Freezes an object and all its properties recursively.
     * @param obj The object to freeze.
     * @returns The frozen object.
     */
    static deepFreeze<T>(obj: T): T;
    /**
     * Thaws a frozen object and all its properties recursively.
     * @param obj The object to thaw.
     * @returns The thawed object.
     */
    static thaw<T>(obj: T): T;
}
export { Freezer };
//# sourceMappingURL=freezer.d.ts.map