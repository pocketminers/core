import { TimestampItem } from "@components/timestamps/timestamp.item";


describe("TimestampItem", () => {
    it("should create a TimestampItem with a valid date", () => {
        const date = new Date();
        const timestampItem = new TimestampItem(date);
        expect(timestampItem.date).toEqual(date);
    });

    it("should throw an error for invalid date entries", () => {
        try {
            // @ts-ignore
            new TimestampItem("invalid date");
        }
        catch (e: any) {
            expect(e.message).toEqual("Invalid date entry");
        }
    });

    it("should return the correct ISO string", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new TimestampItem(date);
        expect(timestampItem.toISO()).toEqual("2023-10-01T00:00:00.000Z");
    });

    it("should return the correct locale string", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new TimestampItem(date);
        expect(timestampItem.toLocaleString()).toEqual(date.toLocaleString());
    });

    it("should return the correct UNIX timestamp", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new TimestampItem(date);
        expect(timestampItem.toUNIX()).toEqual(Math.floor(date.getTime() / 1000));
    });

    it("should return the correct RFC string", () => {
        const date = new Date("2023-10-01T00:00:00Z");
        const timestampItem = new TimestampItem(date);
        expect(timestampItem.toRFC()).toEqual(date.toUTCString());
    });

    it("should freeze the date property", () => {
        const date = new Date();
        const timestampItem = new TimestampItem(date);
        expect(Object.isFrozen(timestampItem.date)).toBe(true);
    });

    it("should freeze the instance", () => {
        const date = new Date();
        const timestampItem = new TimestampItem(date);
        expect(Object.isFrozen(timestampItem)).toBe(true);
    });

    it("should throw an error when trying to modify the date property", () => {
        const date = new Date();
        const timestampItem = new TimestampItem(date);
        try {
            // @ts-ignore
            timestampItem.date = new Date();
        }
        catch (e: any) {
            expect(e.message).toEqual("Cannot assign to read only property 'date' of object '#<TimestampItem>'");
        }
    });

    it("should throw an error when trying to modify the instance", () => {
        const date = new Date();
        const timestampItem = new TimestampItem(date);
        try {
            // @ts-ignore
            timestampItem = new TimestampItem(new Date());
        }
        catch (e: any) {
            expect(e.message).toEqual("Assignment to constant variable.");
        }
    });

    it("should return the correct date entry type", () => {
        const date = new Date();
        const timestampItem = new TimestampItem(date);
        expect(timestampItem.date instanceof Date).toBe(true);
    });

    it("should throw an error for empty date", () => {
        try {
            // @ts-ignore
            new TimestampItem(null);
        }
        catch (e: any) {
            expect(e.message).toEqual("Invalid date entry");
        }
    });
});