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
import { PocketMessage } from '@components/message';
import { BaseMessageLevels } from '@templates/v0/base/message';
var PocketErrorMessage = /** @class */ (function (_super) {
    __extends(PocketErrorMessage, _super);
    function PocketErrorMessage(_a) {
        var code = _a.code, level = _a.level, error = _a.error, timestamp = _a.timestamp, data = _a.data, throwError = _a.throwError, callback = _a.callback, _b = _a.delayCallback, delayCallback = _b === void 0 ? 0 : _b;
        var _this = _super.call(this, {
            code: code,
            level: level !== undefined ? level : BaseMessageLevels.ERROR,
            body: error !== undefined ? error : {},
            timestamp: timestamp !== undefined ? timestamp : new Date(),
            data: data !== undefined ? data : {},
            printToConsole: false,
            callback: callback,
            delayCallback: delayCallback
        }) || this;
        _this.handleThrowError(throwError !== undefined ? throwError : false);
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
        if (throwError) {
            throw this;
        }
    };
    return PocketErrorMessage;
}(PocketMessage));
export { PocketErrorMessage };
//# sourceMappingURL=error.js.map