var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { BaseSuccessCodes } from "../../templates/v0/base/statuses.js";
import { BaseMessageLevels } from "../../templates/v0/base/message.js";
import { PocketTimestamp } from "../base/timestamp.js";
import { Immuteable } from "../base/index.js";
/**
 * PocketMessage is a class that represents a message with a code, level, body, timestamp, and optional data.
 * - It is used to encapsulate messages in the Pocket framework.
 * - The class is generic and can be used with different types of codes, levels, body, and data.
 * - This class also ensures that the message object is immutable after creation.
 * - This class does not extend the PocketObject class, as it does not include a metadata object.
 *
 * @template C - The message code. Defaults to BaseSuccessCodes.OK.
 * @template L - The message level. Defaults to BaseMessageLevels.SUCCESS.
 * @template B - The type of the message body. Defaults to any.
 * @template D - The type of the message data. Defaults to any.
 *
 * @example
 * const message = new PocketMessage({
 *    code: BaseSuccessCodes.OK,
 *    level: BaseMessageLevels.SUCCESS,
 *    body: "Operation completed successfully",
 *    timestamp: new PocketTimestamp(new Date()),
 *    data: { id: 1 },
 *    configuration: {
 *        printToConsole: true,
 *        callback: async (message) => {
 *            console.log("Callback executed:", message);
 *        },
 *        delayCallback: 1000
 *    }
 * });
 */
var PocketMessage = /** @class */ (function (_super) {
    __extends(PocketMessage, _super);
    function PocketMessage(_a) {
        var code = _a.code, level = _a.level, body = _a.body, timestamp = _a.timestamp, data = _a.data, _b = _a.configuration, _c = _b === void 0 ? {
            printToConsole: false,
            callback: undefined,
            delayCallback: 0,
            freeze: true
        } : _b, printToConsole = _c.printToConsole, callback = _c.callback, delayCallback = _c.delayCallback, freeze = _c.freeze;
        var _this = _super.call(this, {
            printToConsole: printToConsole !== undefined ? printToConsole : PocketMessage.defaultOptions.printToConsole,
            callback: callback !== undefined ? callback : PocketMessage.defaultOptions.callback,
            delayCallback: delayCallback !== undefined ? delayCallback : PocketMessage.defaultOptions.delayCallback,
            freeze: freeze !== undefined ? freeze : PocketMessage.defaultOptions.freeze
        }, PocketMessage.prototype) || this;
        _this.code = code !== undefined ? code : BaseSuccessCodes.OK;
        var expectedLevel = _this.getLevelFromCode(_this.code);
        _this.level = level !== undefined ? level : expectedLevel;
        // this.checkCodeAndLevel(this.code, this.level);
        _this.body = body !== undefined ? body : {};
        _this.timestamp = timestamp !== undefined ? timestamp : new PocketTimestamp(new Date());
        _this.data = data !== undefined ? data : {};
        _this.callback = callback;
        _this.initializeImmuteable({
            force: freeze !== undefined ? freeze : PocketMessage.defaultOptions.freeze
        });
        _this.handlePrintToConsole(printToConsole);
        // If a delayCallback is provided, set a timeout to call the callback
        // after the specified delay
        if (delayCallback > 0
            && _this.callback !== undefined
            && typeof _this.callback === "function") {
            setTimeout(function () {
                _this.handleCallback().then(function () {
                    null;
                }).catch(function (error) {
                    console.error("Error executing callback:", error);
                });
            }, delayCallback); // Convert seconds to milliseconds
        }
        else if (delayCallback === 0
            && _this.callback !== undefined
            && typeof _this.callback === "function") {
            // If no delayCallback is provided, call the callback immediately
            _this.handleCallback().then(function () {
                null;
            }).catch(function (error) {
                console.error("Error executing callback:", error);
            });
        }
        else if (delayCallback === -1
            && _this.callback !== undefined) {
            // If no callback is provided, do nothing
            console.log("Callback delayed indefinitely");
        }
        return _this;
    }
    PocketMessage.prototype.getLevelFromCode = function (code) {
        var startsWith = code.toString().charAt(0);
        switch (Number(startsWith)) {
            case 1:
                return BaseMessageLevels.INFO;
            case 2:
                return BaseMessageLevels.SUCCESS;
            case 3:
                return BaseMessageLevels.WARNING;
            case 4:
            case 5:
                return BaseMessageLevels.ERROR;
            default:
                return BaseMessageLevels.INFO;
        }
    };
    PocketMessage.prototype.checkCodeAndLevel = function (code, level) {
        if (!Object.values(BaseMessageLevels).includes(level)) {
            throw new Error("Invalid level: ".concat(level));
        }
        // switch (level) {
        //     case BaseMessageLevels.INFO:
        //         if (!Object.values(BaseInfoCodes).includes(code as BaseInfoCodes)) {
        //             throw new Error(`Invalid code for INFO level: ${code}`);
        //         }
        //         break;
        //     case BaseMessageLevels.SUCCESS:
        //         if (!Object.values(BaseSuccessCodes).includes(code as BaseSuccessCodes)) {
        //             throw new Error(`Invalid code for SUCCESS level: ${code}`);
        //         }
        //         break;
        //     case BaseMessageLevels.WARNING:
        //         if (!Object.values(BaseWarningCodes).includes(code as BaseWarningCodes)) {
        //             throw new Error(`Invalid code for WARNING level: ${code}`);
        //         }
        //         break;
        //     case BaseMessageLevels.ERROR:
        //         if (
        //             !Object.values(BaseClientErrorCodes).includes(code as BaseClientErrorCodes) &&
        //             !Object.values(BaseServerErrorCodes).includes(code as BaseServerErrorCodes)
        //         ) {
        //             throw new Error(`Invalid code for ERROR level: ${code}`);
        //         }
        //         break;
        //     default:
        //         throw new Error(`Invalid level: ${level}`);
        // }
    };
    /**
     * Sets the callback function to be called when the message is created.
     * @param callback - The callback function to be called.
     */
    PocketMessage.prototype.handleCallback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(this.callback !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.callback(this)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error executing callback:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the printToConsole property to true or false.
     * @param printToConsole - Whether to print the message to the console.
     */
    PocketMessage.prototype.handlePrintToConsole = function (printToConsole) {
        if (printToConsole !== undefined
            && printToConsole === true) {
            this.printMessage();
        }
    };
    /**
     * Prints the message to the console based on its level.
     * - INFO: console.info
     * - SUCCESS: console.log
     * - WARNING: console.warn
     * - ERROR: console.error
     * - CRITICAL: console.error
     * - DEBUG: console.debug
     * - TRACE: console.trace
     */
    PocketMessage.prototype.printMessage = function () {
        switch (this.level) {
            case BaseMessageLevels.INFO:
                console.info(this.body);
                break;
            case BaseMessageLevels.SUCCESS:
                console.log(this.body);
                break;
            case BaseMessageLevels.WARNING:
                console.warn(this.body);
                break;
            case BaseMessageLevels.CRITICAL:
            case BaseMessageLevels.ERROR:
                console.error(this.body);
                break;
            case BaseMessageLevels.DEBUG:
                console.debug(this.body);
                break;
            case BaseMessageLevels.TRACE:
                console.trace(this.body);
                break;
            default:
                console.log(this.body);
                break;
        }
    };
    /**
     * Returns a string representation of the PocketMessage instance.
     * @returns A string representation of the PocketMessage instance.
     */
    PocketMessage.prototype.toString = function () {
        return "PocketMessage { code: ".concat(this.code, ", level: ").concat(this.level, ", body: ").concat(this.body, ", timestamp: ").concat(this.timestamp, ", data: ").concat(this.data, " }");
    };
    /**
     * Converts the PocketMessage instance to a JSON string.
     * @returns A JSON string representation of the PocketMessage instance.
     */
    PocketMessage.prototype.toJSON = function () {
        return JSON.stringify({
            code: this.code,
            level: this.level,
            body: this.body,
            timestamp: this.timestamp,
            data: this.data
        });
    };
    /**
     * Converts the PocketMessage instance to a plain object.
     * @returns A plain object representation of the PocketMessage instance.
     */
    PocketMessage.prototype.toObject = function () {
        return {
            code: this.code,
            level: this.level,
            body: this.body,
            timestamp: this.timestamp,
            data: this.data
        };
    };
    PocketMessage.defaultOptions = {
        printToConsole: false,
        callback: undefined,
        delayCallback: 0,
        freeze: true
    };
    return PocketMessage;
}(Immuteable));
export { PocketMessage };
//# sourceMappingURL=message.js.map