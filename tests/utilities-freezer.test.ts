import { Freezer } from "../src/utilities/freezer";

describe("Freezer", () => {
    it("should freeze a simple object", () => {
        const obj = { a: 1, b: 2 };
        const frozenObj = Freezer.deepFreeze(obj);

        expect(Object.isFrozen(frozenObj)).toBe(true);
        expect(() => (frozenObj.a = 10)).toThrow();
    });

    it("should freeze a nested object", () => {
        const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
        const frozenObj = Freezer.deepFreeze(obj);

        expect(Object.isFrozen(frozenObj)).toBe(true);
        expect(Object.isFrozen(frozenObj.b)).toBe(true);
        expect(Object.isFrozen(frozenObj.b.d)).toBe(true);
        expect(() => (frozenObj.b.c = 10)).toThrow();
    });

    it("should freeze an array", () => {
        const arr = [1, 2, 3];
        const frozenArr = Freezer.deepFreeze(arr);

        expect(Object.isFrozen(frozenArr)).toBe(true);
        expect(() => (frozenArr[0] = 10)).toThrow();
    });

    it("should freeze an object with arrays", () => {
        const obj = { a: [1, 2, 3], b: { c: [4, 5, 6] } };
        const frozenObj = Freezer.deepFreeze(obj);

        expect(Object.isFrozen(frozenObj)).toBe(true);
        expect(Object.isFrozen(frozenObj.a)).toBe(true);
        expect(Object.isFrozen(frozenObj.b)).toBe(true);
        expect(Object.isFrozen(frozenObj.b.c)).toBe(true);
        expect(() => (frozenObj.a[0] = 10)).toThrow();
    });

    it("should handle null values gracefully", () => {
        const obj = { a: null, b: { c: null } };
        const frozenObj = Freezer.deepFreeze(obj);

        expect(Object.isFrozen(frozenObj)).toBe(true);
        expect(Object.isFrozen(frozenObj.b)).toBe(true);
    });

    it("should handle functions in objects", () => {
        const obj = { a: 1, b: () => 2 };
        const frozenObj = Freezer.deepFreeze(obj);

        expect(Object.isFrozen(frozenObj)).toBe(true);
        expect(() => (frozenObj.a = 10)).toThrow();
        expect(frozenObj.b()).toBe(2); // Ensure the function still works
    });
});