import { PocketTimestamp } from "@components/timestamp";


describe("PocketTimestamp", () => {
    it("should create a PocketTimestamp with a valid date", () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        expect(timestampItem.date).toEqual(date);
    });

    it("should throw an error for invalid date entries", () => {
        try {
            // @ts-ignore
            new PocketTimestamp("invalid date");
        }
        catch (e: any) {
            expect(e.message).toEqual("Invalid date entry");
        }
    });

    it("should return the correct ISO string", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new PocketTimestamp(date);
        expect(timestampItem.toISO()).toEqual("2023-10-01T00:00:00.000Z");
    });

    it("should return the correct locale string", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new PocketTimestamp(date);
        expect(timestampItem.toLocaleString()).toEqual(date.toLocaleString());
    });

    it("should return the correct UNIX timestamp", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new PocketTimestamp(date);
        expect(timestampItem.toUNIX()).toEqual(Math.floor(date.getTime() / 1000));
    });

    it("should return the correct RFC string", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new PocketTimestamp(date);
        console.log(timestampItem.toRFC());
        expect(timestampItem.toRFC()).toEqual(date.toUTCString());
    });

    it("should freeze the date property", () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        expect(Object.isFrozen(timestampItem.date)).toBe(true);
    });

    it("should freeze the instance", () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        expect(Object.isFrozen(timestampItem)).toBe(true);
    });

    it("should throw an error when trying to modify the date property", () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        try {
            // @ts-ignore
            timestampItem.date = new Date();
        }
        catch (e: any) {
            expect(e.message).toEqual("Cannot assign to read only property 'date' of object '#<PocketTimestamp>'");
        }
    });

    it("should throw an error when trying to modify the instance", () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        try {
            // @ts-ignore
            timestampItem = new PocketTimestamp(new Date());
        }
        catch (e: any) {
            expect(e.message).toEqual("Assignment to constant variable.");
        }
    });

    it("should return the correct date entry type", () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        expect(timestampItem.date instanceof Date).toBe(true);
    });

    it("should throw an error for empty date", () => {
        try {
            // @ts-ignore
            new PocketTimestamp(null);
        }
        catch (e: any) {
            expect(e.message).toEqual("Invalid date entry");
        }
    });

    it('should initialize with the current date if no argument is passed', () => {
        const timestampItem = new PocketTimestamp();
        const currentDate = new Date();
        expect(timestampItem.date.getFullYear()).toBe(currentDate.getFullYear());
        expect(timestampItem.date.getMonth()).toBe(currentDate.getMonth());
        expect(timestampItem.date.getDate()).toBe(currentDate.getDate());
    });

    it('should be frozen', () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        expect(Object.isFrozen(timestampItem)).toBe(true);
    });

    it('should be frozen deeply', () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        expect(Object.isFrozen(timestampItem.date)).toBe(true);
    });

    it('should throw an error when trying to modify the date property', () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        try {
            // @ts-ignore
            timestampItem.date = new Date();
        } catch (e: any) {
            expect(e.message).toEqual("Cannot assign to read only property 'date' of object '#<PocketTimestamp>'");
        }
    });

    it('should throw an error when trying to modify the instance', () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        try {
            // @ts-ignore
            timestampItem = new PocketTimestamp(new Date());
        } catch (e: any) {
            expect(e.message).toEqual("Assignment to constant variable.");
        }
    });

    it('should throw an error when trying to modify the date property directly', () => {
        const date = new Date();
        const timestampItem = new PocketTimestamp(date);
        try {
            // @ts-ignore
            timestampItem.date = new Date();
        } catch (e: any) {
            expect(e.message).toEqual("Cannot assign to read only property 'date' of object '#<PocketTimestamp>'");
        }
    });
    
});