import { PocketErrorMessage } from "@components/common/error";
import { BaseMessageLevels } from "@templates/v0/base/message";
import { BaseClientErrorCodes } from "@templates/v0/base/statuses";
import { PocketTimestamp } from "@components/base/timestamp";


describe("PocketErrorMessage", () => {
    it("should create a PocketErrorMessage with default values", () => {
        const error = new Error("Test error");
        const message = new PocketErrorMessage<
            BaseClientErrorCodes.BAD_REQUEST,
            BaseMessageLevels.ERROR,
            Error
        >({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error
        });

        expect(message.code).toBe(400);
        expect(message.level).toBe("ERROR");
        expect(message.body).toBe(error);
        expect(message.timestamp).toBeInstanceOf(PocketTimestamp);
        expect(message.data).toEqual({});
    });

    it("should create a PocketErrorMessage with custom values", () => {
        const error = new Error("Custom error");
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error,
            timestamp: new PocketTimestamp(new Date("2023-01-01")),
            data: { key: "value" }
        });

        expect(message.code).toBe(400);
        expect(message.level).toBe("ERROR");
        expect(message.body).toBe(error);
        expect(message.timestamp).toEqual(new PocketTimestamp(new Date("2023-01-01")));
        expect(message.data).toEqual({ key: "value" });
    });

    it("should freeze the PocketErrorMessage object", () => {
        const error = new Error("Test error");
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error
        });

        expect(() => {
            (message as any).code = BaseClientErrorCodes.UNAUTHORIZED;
        }).toThrow();

        expect(() => {
            (message as any).level = BaseMessageLevels.WARNING;
        }).toThrow();
    });

    it("should use a default level if not provided", () => {
        const error = new Error("Test error");
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            error: error
        });

        expect(message.level).toBe(BaseMessageLevels.ERROR);
    });

    it("should call the callback function if provided", async () => {
        const error = new Error("Test error");
        const callback = jest.fn();
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error,
            configuration: {
                callback,
                delayCallback: 0,
                printToConsole: false,
                freeze: false,
                throwError: false
            }
        });

        expect(callback).toHaveBeenCalledWith(message);
    });

    it("should not call the callback function if not provided", () => {
        const error = new Error("Test error");
        const callback = jest.fn();
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it("should throw the error if throwError is true", () => {
        const error = new Error("Test error");
        let message: PocketErrorMessage<BaseClientErrorCodes.BAD_REQUEST, BaseMessageLevels.ERROR> | undefined;
        expect(() => {
            message = new PocketErrorMessage({
                code: BaseClientErrorCodes.BAD_REQUEST,
                level: BaseMessageLevels.ERROR,
                error: error,
                configuration: {
                    throwError: true,
                    callback: undefined,
                    delayCallback: 0,
                    printToConsole: false,
                    freeze: false
                }
            });
        }).toThrow(message?.toString());
    });

    it("should not throw the error if throwError is false", () => {
        const error = new Error("Test error");
        expect(() => {
            new PocketErrorMessage({
                code: BaseClientErrorCodes.BAD_REQUEST,
                level: BaseMessageLevels.ERROR,
                error: error,
                configuration: {
                    throwError: false,
                    callback: undefined,
                    delayCallback: 0,
                    printToConsole: false,
                    freeze: false
                }
            });
        }).not.toThrow();
    });

    it("should not throw the error if throwError is not provided", () => {
        const error = new Error("Test error");
        expect(() => {
            new PocketErrorMessage({
                code: BaseClientErrorCodes.BAD_REQUEST,
                level: BaseMessageLevels.ERROR,
                error: error
            });
        }).not.toThrow();
    });

    // it("should not throw the error if throwError is undefined", () => {
    //     const error = new Error("Test error");
    //     expect(() => {
    //         new PocketErrorMessage({
    //             code: BaseClientErrorCodes.BAD_REQUEST,
    //             level: BaseMessageLevels.ERROR,
    //             error: error,
    //             configuration: {
    //                 throwError: false,
    //                 callback: undefined,
    //                 delayCallback: 0,
    //                 printToConsole: false,
    //                 freeze: false
    //             }
    //         });
    //     }).not.toThrow();
    // });

    it('should delay the callback execution', async () => {
        const error = new Error("Test error");
        const callback = jest.fn();
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error,
            configuration: {
                throwError: false,
                callback: callback,
                delayCallback: 1000,
                printToConsole: false,
                freeze: false
            }
        });

        expect(callback).not.toHaveBeenCalled();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(callback).toHaveBeenCalledWith(message);
    });

    it("should not delay the callback execution if delay is not provided", async () => {
        const error = new Error("Test error");
        const callback = jest.fn();
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error,
            configuration: {
                throwError: false,
                callback: callback,
                delayCallback: 0,
                printToConsole: false,
                freeze: false
            }
        });

        expect(callback).toHaveBeenCalled();
    });

    it("should not delay the callback execution if delay is 0", async () => {
        const error = new Error("Test error");
        const callback = jest.fn();
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.CONFLICT,
            level: BaseMessageLevels.ERROR,
            error: error,
            configuration: {
                throwError: false,
                callback: callback,
                delayCallback: 0,
                printToConsole: false,
                freeze: false
            }
        });

        expect(callback).toHaveBeenCalled();

    });

    it('should delay the callback execution indefinetly if the delay is -1', async () => {
        const error = new Error("Test error");
        const callback = jest.fn();
        const message = new PocketErrorMessage({
            code: BaseClientErrorCodes.BAD_REQUEST,
            level: BaseMessageLevels.ERROR,
            error: error,
            configuration: {
                throwError: false,
                callback: callback,
                delayCallback: -1,
                printToConsole: false,
                freeze: false
            }
        });

        expect(callback).not.toHaveBeenCalled();

        await message.handleCallback();

        expect(callback).toHaveBeenCalledWith(message);
    });
});