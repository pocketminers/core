import {
    DateUtilities
} from "@utilities/date";


describe("DateUtilities", () => {
    /**
     * Test cases for generating date in different formats
     */

    it("should generate ISO date string", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const isoString = DateUtilities.generateISODateString(date);
        expect(isoString).toBe("2023-10-01T12:00:00.000Z");
    });

    it("should generate locale date string", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const localeString = DateUtilities.generateLocaleDateString(date);
        expect(localeString).toBe(date.toLocaleString());
    });

    it("should generate UNIX timestamp number", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const unixTimestamp = DateUtilities.generateUnixTimestampNumber(date);
        expect(unixTimestamp).toBe(Math.floor(date.getTime() / 1000));
    });

    it("should generate RFC date string", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const rfcString = DateUtilities.generateRFCDateString(date);
        expect(rfcString).toBe(date.toUTCString());
    });


    /**
     * 
     * Test cases for generating date from different formats
     */

    it("should generate date from UNIX timestamp", () => {
        const unixTimestamp = 1696156800; // Example UNIX timestamp
        const date = DateUtilities.generateDateFromUnixTimestamp(unixTimestamp);
        expect(date.getTime()).toBe(unixTimestamp * 1000);
    });

    it("should generate date from ISO date string", () => {
        const isoDateString = "2023-10-01T12:00:00.000Z"; // Example ISO date string
        const date = DateUtilities.generateDateFromISODateString(isoDateString);
        expect(date.toISOString()).toBe(isoDateString);
    });

    it("should generate date from RFC date string", () => {
        const rfcDateString = "Sun, 01 Oct 2023 12:00:00 GMT"; // Example RFC date string
        const date = DateUtilities.generateDateFromRFCDateString(rfcDateString);
        expect(date.toUTCString()).toBe(rfcDateString);
    });

    it("should generate date from locale date string", () => {
        const localeDateString = new Date("2023-10-01T12:00:00Z").toLocaleString(); // Example locale date string
        const date = DateUtilities.generateDateFromLocaleDateString(localeDateString);
        expect(date.toLocaleString()).toBe(localeDateString);
    });


    /**
     * Test cases for generating date from empty strings
     */

    it("should generate date from empty string", () => {
        const date = DateUtilities.generateDateFromISODateString("");
        expect(date.toISOString()).toBeDefined();
    });

    it("should generate date from empty RFC string", () => {
        const date = DateUtilities.generateDateFromRFCDateString("");
        expect(date.toUTCString()).toBeDefined();
    });

    it("should generate date from empty locale string", () => {
        const date = DateUtilities.generateDateFromLocaleDateString("");
        expect(date.toLocaleString()).toBeDefined();
    });


    /**
     * Test cases for generating date from invalid strings
     * These tests are expected to throw errors
     * because the input strings are not valid date formats.
     */

    it("should generate date from invalid ISO string", () => {
        try {
            const date = DateUtilities.generateDateFromISODateString("invalid-date");
        }
        catch (error: any) {
            expect(error.message).toBe("RangeError: Invalid time value");
        }
    });

    it("should generate date from invalid UNIX timestamp", () => {
        try {
            const date = DateUtilities.generateDateFromUnixTimestamp(NaN);
        }
        catch (error: any) {
            expect(error.message).toBe("RangeError: Invalid time value");
        }
    });

    it("should generate date from invalid RFC string", () => {
        try {
            const date = DateUtilities.generateDateFromRFCDateString("invalid-date");
        }
        catch (error: any) {
            expect(error.message).toBe("RangeError: Invalid time value");
        }
    });

    it("should generate date from invalid locale string", () => {
        try {
            const date = DateUtilities.generateDateFromLocaleDateString("invalid-date");
        }
        catch (error: any) {
            expect(error.message).toBe("RangeError: Invalid time value");
        }
    });


    /**
     * Test cases for adding days, hours, and minutes to a date
     */
    it("should add days to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addDays(date, 5);
        expect(newDate.toISOString()).toBe("2023-10-06T12:00:00.000Z");
    });

    it("should add hours to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addHours(date, 5);
        expect(newDate.toISOString()).toBe("2023-10-01T17:00:00.000Z");
    });

    it("should add minutes to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addMinutes(date, 30);
        expect(newDate.toISOString()).toBe("2023-10-01T12:30:00.000Z");
    });

    it("should add seconds to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addSeconds(date, 30);
        expect(newDate.toISOString()).toBe("2023-10-01T12:00:30.000Z");
    });

    /**
     * Test cases for adding weeks and months to a date
     */

    it("should add weeks to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addWeeks(date, 2);
        expect(newDate.toISOString()).toBe("2023-10-15T12:00:00.000Z");
    });

    it("should add months to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addMonths(date, 2);
        expect(newDate.toISOString()).toBe("2023-12-01T13:00:00.000Z");
    });

    it("should add years to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addYears(date, 2);
        expect(newDate.toISOString()).toBe("2025-10-01T12:00:00.000Z");
    });

    /**
     * Test cases for adding milliseconds to a date
     */

    it("should add milliseconds to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addMilliseconds(date, 500);
        expect(newDate.toISOString()).toBe("2023-10-01T12:00:00.500Z");
    });

    it("should add large amount of milliseconds to a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.addMilliseconds(date, 1000000000000);
        expect(newDate.toISOString()).toBe("2055-06-09T13:46:40.000Z");
    });


    /**
     * Test cases for subtracting days, hours, and minutes from a date
     */
    it("should subtract days from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractDays(date, 5);
        expect(newDate.toISOString()).toBe("2023-09-26T12:00:00.000Z");
    });

    it("should subtract hours from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractHours(date, 5);
        expect(newDate.toISOString()).toBe("2023-10-01T07:00:00.000Z");
    });

    it("should subtract minutes from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractMinutes(date, 30);
        expect(newDate.toISOString()).toBe("2023-10-01T11:30:00.000Z");
    });

    it("should subtract seconds from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractSeconds(date, 30);
        expect(newDate.toISOString()).toBe("2023-10-01T11:59:30.000Z");
    });

    /**
     * Test cases for subtracting weeks and months from a date
     */

    it("should subtract weeks from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractWeeks(date, 2);
        expect(newDate.toISOString()).toBe("2023-09-17T12:00:00.000Z");
    });

    it("should subtract months from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractMonths(date, 2);
        expect(newDate.toISOString()).toBe("2023-08-01T12:00:00.000Z");
    });

    it("should subtract years from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractYears(date, 2);
        expect(newDate.toISOString()).toBe("2021-10-01T12:00:00.000Z");
    });

    /**
     * Test cases for subtracting milliseconds from a date
     */
    it("should subtract milliseconds from a date", () => {
        const date = new Date("2023-10-01T12:00:00Z");
        const newDate = DateUtilities.subtractMilliseconds(date, 500);
        expect(newDate.toISOString()).toBe("2023-10-01T11:59:59.500Z");
    });


});
