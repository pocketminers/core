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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Metadata } from "../metadata";
import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { Freezer } from "../../utilities/freezer";
import { MultiHashUtilities } from "../../utilities/multiHash";
/**
 * Argument is a generic class that represents a key-value pair.
 *
 */
var Argument = /** @class */ (function () {
    function Argument(_a) {
        var name = _a.name, value = _a.value, meta = _a.meta;
        var _b, _c;
        this.data = {
            name: name,
            value: value
        };
        this.metadata = new Metadata(__assign({ id: {
                type_: ((_b = meta === null || meta === void 0 ? void 0 : meta.id) === null || _b === void 0 ? void 0 : _b.type_) || BaseIdentifierTypes.Undefined,
                value: ((_c = meta === null || meta === void 0 ? void 0 : meta.id) === null || _c === void 0 ? void 0 : _c.value) || "undefined"
            } }, meta));
        Freezer.deepFreeze(this);
    }
    Object.defineProperty(Argument.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Argument.prototype, "value", {
        get: function () {
            return this.data.value;
        },
        enumerable: false,
        configurable: true
    });
    Argument.prototype.toString = function () {
        return "".concat(String(this.name), ": ").concat(this.value instanceof String ? this.value
            : this.value instanceof Number ? this.value.toString()
                : this.value instanceof Boolean ? this.value.toString()
                    : this.value instanceof Array ? "[".concat(this.value.map(function (v) { return v === null || v === void 0 ? void 0 : v.toString(); }).join(", "), "]")
                        : this.value instanceof Object ? "{".concat(Object.entries(this.value).map(function (_a) {
                            var _b = __read(_a, 2), k = _b[0], v = _b[1];
                            return "".concat(k, ": ").concat(v);
                        }).join(", "), "}")
                            : 'undefined');
    };
    Argument.prototype.toKeyValuePair = function () {
        return [[this.name, this.value]];
    };
    Argument.prototype.toRecord = function () {
        var _a;
        return _a = {},
            _a[this.name] = this.value,
            _a;
    };
    Argument.prototype.toHashedIdentifier = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, MultiHashUtilities.generateIdentifier(this.toString())];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, {
                                type_: BaseIdentifierTypes.Multihash,
                                value: hash.value
                            }];
                }
            });
        });
    };
    return Argument;
}());
export { Argument };
//# sourceMappingURL=argument.js.map