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
import { PocketStorage } from "../base/storage";
var ArgumentStorage = /** @class */ (function (_super) {
    __extends(ArgumentStorage, _super);
    function ArgumentStorage(_a) {
        var location = _a.location, _b = _a.items, items = _b === void 0 ? [] : _b, _c = _a.allowDuplicates, allowDuplicates = _c === void 0 ? false : _c, _d = _a.allowEmpty, allowEmpty = _d === void 0 ? false : _d, maxSize = _a.maxSize;
        return _super.call(this, {
            location: location,
            items: items,
            allowDuplicates: allowDuplicates,
            allowEmpty: allowEmpty,
            maxSize: maxSize
        }) || this;
    }
    return ArgumentStorage;
}(PocketStorage));
export { ArgumentStorage };
//# sourceMappingURL=argument.storage.js.map