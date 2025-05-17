import { PocketMessage } from "@components/common/message";
import { BaseMessageLevels} from "@templates/v0/base/message";
import { BaseServerErrorCodes, BaseSuccessCodes, BaseWarningCodes } from "@templates/v0/base/statuses";
import { PocketTimestamp } from "@components/base/timestamp";

describe("PocketMessage", () => {
    it("should create a PocketMessage with default values", () => {
        const message = new PocketMessage({
            body: "Test message"
        });

        expect(message.code).toBe(BaseSuccessCodes.OK);
        expect(message.level).toBe(BaseMessageLevels.SUCCESS);
        expect(message.body).toBe("Test message");
        expect(message.timestamp).toBeInstanceOf(PocketTimestamp);
        expect(message.data).toEqual({});
    });

    it("should create a PocketMessage with custom values", () => {
        const message = new PocketMessage({
            code: BaseSuccessCodes.CREATED,
            level: BaseMessageLevels.SUCCESS,
            body: "Custom message",
            timestamp: new PocketTimestamp(new Date("2023-01-01")),
            data: { key: "value" }
        });

        expect(message.code).toBe(BaseSuccessCodes.CREATED);
        expect(message.level).toBe(BaseMessageLevels.SUCCESS);
        expect(message.body).toBe("Custom message");
        expect(message.timestamp).toEqual(new PocketTimestamp(new Date("2023-01-01")));
        expect(message.data).toEqual({ key: "value" });
    });

    it("should freeze the PocketMessage object", () => {
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message"
        });

        expect(() => {
            (message as any).code = BaseSuccessCodes.CREATED;
        }).toThrow();

        expect(() => {
            (message as any).level = BaseMessageLevels.WARNING;
        }).toThrow();
    });

    it("should use a default level if not provided", () => {
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message"
        });

        expect(message.level).toBe(BaseMessageLevels.SUCCESS);
    });

    it("should call the callback function if provided", async () => {
        const callback = jest.fn();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                callback,
                freeze: false,
                delayCallback: 0,
                printToConsole: false
            }
        });

        // await message.handleCallback();

        expect(callback).toHaveBeenCalledWith(message);
    });

    it("should not call the callback function if not provided", () => {
        const callback = jest.fn();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message"
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it("should call the callback function if it is async", async () => {
        const callback = jest.fn(async (): Promise<void> => {
            return new Promise((resolve) => {
                setTimeout(() => {
                }, 1000);
            });
        });
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                printToConsole: false,
                freeze: false,
                delayCallback: 0,
                callback
            }

        });

        expect(callback).toHaveBeenCalled();
    });

    it("should print to console if printToConsole is true", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            },
        });

        expect(consoleSpy).toHaveBeenCalledWith(message.body);
        consoleSpy.mockRestore();
    });

    it("should not print to console if printToConsole is false", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                printToConsole: false,
                freeze: false,
                delayCallback: 0
            },
            
        });

        expect(consoleSpy).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    // it("should throw an error if an invalid code is provided", () => {
    //     expect(() => {
    //         new PocketMessage({
    //             // @ts-expect-error
    //             code: "INVALID_CODE" as BaseMessageCodes,
    //             body: "Test message"
    //         });
    //     }).toThrow("Invalid code for INFO level: INVALID_CODE");
    // });

    // it("should throw an error if an invalid level is provided", () => {
    //     expect(() => {
    //         new PocketMessage({
    //             code: BaseSuccessCodes.OK,
    //             level: "INVALID_LEVEL" as BaseMessageLevels,
    //             body: "Test message"
    //         });
    //     }).toThrow("Invalid level: INVALID_LEVEL");
    // });

    // it("should throw an error if an invalid code is provided for the specified level", () => {
    //     expect(() => {
    //         new PocketMessage({
    //             code: BaseSuccessCodes.OK,
    //             level: BaseMessageLevels.WARNING,
    //             body: "Test message"
    //         });
    //     }).toThrow("Invalid code for WARNING level: 200");
    // });

    it("should print the message to the console based on its level", () => {
        const consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
        const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

        new PocketMessage({
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.SUCCESS,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleLogSpy).toHaveBeenCalledWith("Test message");
        expect(consoleInfoSpy).not.toHaveBeenCalled();
        expect(consoleWarnSpy).not.toHaveBeenCalled();
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        consoleInfoSpy.mockRestore();
        consoleLogSpy.mockRestore();
        consoleWarnSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it("should print a warning message to the console", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        const message = new PocketMessage({
            code: BaseWarningCodes.MOVED_PERMANENTLY,
            level: BaseMessageLevels.WARNING,
            body: "Warning message",

            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleWarnSpy).toHaveBeenCalledWith("Warning message");
        consoleWarnSpy.mockRestore();
    });

    it("should print an error message to the console", () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
        const message = new PocketMessage({
            code: BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
            level: BaseMessageLevels.ERROR,
            body: "Error message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith("Error message");
        consoleErrorSpy.mockRestore();
    });

    it('should delay the callback function if delay is provided', async () => {
        const callback = jest.fn();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                callback,
                freeze: false,
                delayCallback: 1000,
                printToConsole: false
            }
        });

        // Simulate the delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(callback).toHaveBeenCalledWith(message);
    });

    it('should not delay the callback function if delay is not provided', async () => {
        const callback = jest.fn();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                freeze: false,
                delayCallback: 0,
                printToConsole: false,
                callback
            }
        });

        expect(callback).toHaveBeenCalledWith(message);
    });

    it('should delay the callback function indefinietly if the delay is provided as -1', async () => {
        const callback = jest.fn();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                callback,
                freeze: false,
                delayCallback: -1,
                printToConsole: false
            }
        });

        // Simulate the delay
        await message.handleCallback();

        expect(callback).toHaveBeenCalledWith(message);
    });

    it('should print the message in the console if printToConsole is true', () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(message.body);
        consoleSpy.mockRestore();
    })

    it('should print the message in the proper format based on the level - info', () => {
        const consoleSpy = jest.spyOn(console, "info").mockImplementation();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.INFO,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(`${message.body}`);
        consoleSpy.mockRestore();
    });

    it('should print the message in the proper format based on the level - error', () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        const message = new PocketMessage({
            code: BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
            level: BaseMessageLevels.ERROR,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(`${message.body}`);
        consoleSpy.mockRestore();
    });

    it('should print the message in the proper format based on the level - warning', () => {
        const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
        const message = new PocketMessage({
            code: BaseWarningCodes.MOVED_PERMANENTLY,
            level: BaseMessageLevels.WARNING,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(`${message.body}`);
        consoleSpy.mockRestore();
    });

    it('should print the message in the proper format based on the level - success', () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.SUCCESS,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(`${message.body}`);
        consoleSpy.mockRestore();
    });

    it('should print the message in the proper format based on the level - critical', () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        const message = new PocketMessage({
            code: BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
            level: BaseMessageLevels.CRITICAL,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(`${message.body}`);
        consoleSpy.mockRestore();
    });

    it('should print the message in the proper format based on the level - debug', () => {
        const consoleSpy = jest.spyOn(console, "debug").mockImplementation();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.DEBUG,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(`${message.body}`);
        consoleSpy.mockRestore();
    });

    it('should print the message in the proper format based on the level - trace', () => {
        const consoleSpy = jest.spyOn(console, "trace").mockImplementation();
        const message = new PocketMessage({
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.TRACE,
            body: "Test message",
            configuration: {
                printToConsole: true,
                freeze: false,
                delayCallback: 0
            }
        });

        expect(consoleSpy).toHaveBeenCalledWith(`${message.body}`);
        consoleSpy.mockRestore();
    });
});