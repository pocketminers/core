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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Freezer } from "../../utilities/freezer.js";
import { Configurable } from "../base/configurable.js";
import { MultiHashUtilities } from "../../utilities/multiHash.js";
/**
 * The Immuteable class is a base class that provides immutability to its instances.
 * - It uses the Freezer utility to deep freeze the object and its properties.
 * - This ensures that the object cannot be modified after it has been created.
 */
var Immuteable = /** @class */ (function (_super) {
    __extends(Immuteable, _super);
    function Immuteable(configuration, prototype) {
        if (configuration === void 0) { configuration = {
            freeze: true
        }; }
        if (prototype === void 0) { prototype = Immuteable.prototype; }
        var _this = _super.call(this, __assign(__assign({}, Immuteable.defaultOptions), configuration), prototype) || this;
        _this.initializeImmuteable();
        return _this;
    }
    Immuteable.prototype.initializeImmuteable = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.force, force = _c === void 0 ? false : _c;
        if ((this.constructor.prototype === Immuteable.prototype
            && this.getOption('freeze') === true)
            || (force === true
                && this.getOption('freeze') === true)) {
            Immuteable.deepFreeze(this);
        }
    };
    Immuteable.deepFreeze = function (object) {
        if (Immuteable.isFrozen(object) === true) {
            return object;
        }
        return Freezer.deepFreeze(object);
    };
    Immuteable.isFrozen = function (object) {
        return Object.isFrozen(object);
    };
    Immuteable.thaw = function (object) {
        return Freezer.thaw(object);
    };
    Immuteable.prototype.gethash = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var hashableObject, keys_1, keys_1_1, key;
            var e_1, _c;
            var _d;
            var keys = _b.keys;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        hashableObject = {};
                        try {
                            for (keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                key = keys_1_1.value;
                                hashableObject[key] = (_d = Object.getOwnPropertyDescriptor(this, key)) === null || _d === void 0 ? void 0 : _d.value;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (keys_1_1 && !keys_1_1.done && (_c = keys_1.return)) _c.call(keys_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, MultiHashUtilities.hashString(hashableObject.toString())];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
     * The freeze option determines whether the object should be frozen or not.
     * - If set to true, the object and its properties will be frozen.
     * - If set to false, the object and its properties will not be frozen.
     */
    Immuteable.defaultOptions = {
        freeze: true
    };
    return Immuteable;
}(Configurable));
export { Immuteable };
//# sourceMappingURL=immuteable.js.map