import { Immuteable } from "@components/base/immuteable";

describe("Immuteable", () => {
    it("should create an instance of Immuteable", () => {
        const immuteable = new Immuteable();
        expect(immuteable).toBeInstanceOf(Immuteable);
    });

    it("should freeze the object", () => {
        const immuteable = new Immuteable();
        expect(Object.isFrozen(immuteable)).toBe(true);
    });

    it("should not allow modification of properties", () => {
        const immuteable = new Immuteable();
        try {
            (immuteable as any).newProperty = "newValue";
        }
        catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });

    it("should return true for isFrozen method", () => {
        const immuteable = new Immuteable();
        expect(Immuteable.isFrozen(immuteable)).toBe(true);
    });

    it("should return false for isFrozen when freeze is set to False", () => {
        const muteable = new Immuteable({
            freeze: false
        });
        expect(Immuteable.isFrozen(muteable)).toBe(false);
    });

    it("should thaw the object", () => {
        const immuteable = new Immuteable();
        const thawed = Immuteable.thaw(immuteable);
        expect(thawed).not.toBe(immuteable);
        expect(Object.isFrozen(thawed)).toBe(false);
    });

    it("should have defaultOptions", () => {
        const immuteable = new Immuteable();
        expect(immuteable.getOptions()).toEqual({
            freeze: true
        });
    });
});