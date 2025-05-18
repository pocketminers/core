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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { PocketMessage } from '../common/message.js';
import { BaseClientErrorCodes } from '../../templates/v0/index.js';
import { BaseMessageLevels } from '../../templates/v0/base/message.js';
import { PocketTimestamp } from '../base/timestamp.js';
/**
 * PocketErrorMessage is a class that represents an error message in the Pocket framework.
 * It extends the PocketMessage class and provides additional functionality for handling errors.
 */
var PocketErrorMessage = /** @class */ (function (_super) {
    __extends(PocketErrorMessage, _super);
    function PocketErrorMessage(_a) {
        var code = _a.code, level = _a.level, error = _a.error, timestamp = _a.timestamp, data = _a.data, _b = _a.configuration, _c = _b === void 0 ? __assign(__assign(__assign({}, PocketErrorMessage.defaultOptions), PocketMessage.defaultOptions), { throwError: false, callback: undefined, delayCallback: 0 }) : _b, throwError = _c.throwError, callback = _c.callback, delayCallback = _c.delayCallback, printToConsole = _c.printToConsole, freeze = _c.freeze;
        var _this = _super.call(this, {
            code: code !== undefined ? code : BaseClientErrorCodes.BAD_REQUEST,
            level: level !== undefined ? level : BaseMessageLevels.ERROR,
            body: error !== undefined ? error : {},
            timestamp: timestamp !== undefined ? timestamp : new PocketTimestamp(new Date()),
            data: data !== undefined ? data : {},
            configuration: {
                freeze: freeze !== undefined ? freeze : PocketErrorMessage.defaultOptions.freeze,
                printToConsole: printToConsole !== undefined ? printToConsole : PocketErrorMessage.defaultOptions.printToConsole,
                callback: callback,
                delayCallback: delayCallback,
                throwError: throwError !== undefined ? throwError : PocketErrorMessage.defaultOptions.throwError,
            }
        }) || this;
        // this.handleThrowError(throwError !== undefined ? throwError : false);
        if (throwError === true) {
            throw _this.body;
        }
        _this.initializeImmuteable({
            force: true
        });
        return _this;
    }
    Object.defineProperty(PocketErrorMessage.prototype, "Error", {
        get: function () {
            return this.body;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PocketErrorMessage.prototype, "ErrorMessage", {
        get: function () {
            return this.body.message;
        },
        enumerable: false,
        configurable: true
    });
    PocketErrorMessage.prototype.handleThrowError = function (throwError) {
        if (throwError === true) {
            throw this.body;
        }
    };
    PocketErrorMessage.defaultOptions = __assign(__assign({}, PocketMessage.defaultOptions), { throwError: false });
    return PocketErrorMessage;
}(PocketMessage));
export { PocketErrorMessage };
//# sourceMappingURL=error.js.map