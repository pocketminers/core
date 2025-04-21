import { BaseMessageEntry, BaseMessageCode, BaseMessageLevel, BaseMessageLevelHierarchy, BaseMessageCodes, BaseMessageLevels, BaseSuccessCodes, BaseClientErrorCodes, BaseServerErrorCodes } from "../src/templates/v0/base/message";

describe("BaseMessageLevels", () => {
    it("should have the correct enum values", () => {
        expect(BaseMessageLevels.INFO).toBe("INFO");
        expect(BaseMessageLevels.WARNING).toBe("WARNING");
        expect(BaseMessageLevels.ERROR).toBe("ERROR");
        expect(BaseMessageLevels.SUCCESS).toBe("SUCCESS");
        expect(BaseMessageLevels.DEBUG).toBe("DEBUG");
        expect(BaseMessageLevels.CRITICAL).toBe("CRITICAL");
        expect(BaseMessageLevels.TRACE).toBe("TRACE");
    });
});

describe("BaseMessageLevelHierarchy", () => {
    it("should have the correct hierarchy order", () => {
        expect(BaseMessageLevelHierarchy).toEqual([
            BaseMessageLevels.CRITICAL,
            BaseMessageLevels.ERROR,
            BaseMessageLevels.WARNING,
            BaseMessageLevels.INFO,
            BaseMessageLevels.SUCCESS,
            BaseMessageLevels.DEBUG,
            BaseMessageLevels.TRACE
        ]);
    });
});

describe("BaseMessageCodes", () => {
    it("should have the correct enum values", () => {
        expect(BaseSuccessCodes.OK).toBe(200);
        expect(BaseClientErrorCodes.BAD_REQUEST).toBe(400);
        expect(BaseServerErrorCodes.INTERNAL_SERVER_ERROR).toBe(500);
        // Add more assertions as needed
    });
});

describe("BaseMessageEntry", () => {
    it("should allow creating a valid BaseMessageEntry object", () => {
        const entry: BaseMessageEntry = {
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.INFO,
            body: "This is a test message",
            timestamp: new Date(),
        };

        expect(entry.code).toBe(BaseSuccessCodes.OK);
        expect(entry.level).toBe(BaseMessageLevels.INFO);
        expect(entry.body).toBe("This is a test message");
        expect(entry.timestamp).toBeInstanceOf(Date);
    });

    it("should allow optional data field", () => {
        const entry: BaseMessageEntry<BaseMessageCodes, BaseMessageLevels, string, { extra: string }> = {
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.INFO,
            body: "This is a test message",
            timestamp: new Date(),
            data: { extra: "Additional data" },
        };

        expect(entry.data).toEqual({ extra: "Additional data" });
    });
});