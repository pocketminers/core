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
import { Checks } from "@utilities/checks";
import { Freezer } from "@utilities/freezer";
var BaseApiClient = /** @class */ (function () {
    function BaseApiClient(options) {
        this.baseUrl = BaseApiClient.checkUrl(options.baseUrl);
        if (Checks.isEmpty(options.headers)) {
            this.headers = {};
        }
        else {
            this.headers = __assign({}, options.headers);
        }
        Freezer.deepFreeze(this.headers);
        Freezer.deepFreeze(this.baseUrl);
    }
    BaseApiClient.prototype.fetchWithTimeout = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var timeout, retries, _loop_1, attempt, state_1;
            var url = _b.url, options = _b.options;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        timeout = (options === null || options === void 0 ? void 0 : options.timeout) !== undefined ? Number(options.timeout) : 5000;
                        retries = (options === null || options === void 0 ? void 0 : options.retries) !== undefined ? Number(options.retries) : 3;
                        _loop_1 = function (attempt) {
                            var controller, id, fetchOptions, response, _d, _e, _f, error_1;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        controller = new AbortController();
                                        id = setTimeout(function () { return controller.abort(); }, timeout);
                                        fetchOptions = __assign(__assign({}, options), { signal: controller.signal });
                                        _g.label = 1;
                                    case 1:
                                        _g.trys.push([1, 5, , 6]);
                                        return [4 /*yield*/, fetch(url, fetchOptions)];
                                    case 2:
                                        response = _g.sent();
                                        clearTimeout(id);
                                        if (!!response.ok) return [3 /*break*/, 4];
                                        _d = Error.bind;
                                        _f = (_e = "HTTP error! status: ".concat(response.status, "\n ")).concat;
                                        return [4 /*yield*/, response.text()];
                                    case 3: throw new (_d.apply(Error, [void 0, _f.apply(_e, [_g.sent()])]))();
                                    case 4: return [2 /*return*/, { value: response }];
                                    case 5:
                                        error_1 = _g.sent();
                                        clearTimeout(id);
                                        if (attempt === retries - 1) {
                                            throw error_1;
                                        }
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        attempt = 0;
                        _c.label = 1;
                    case 1:
                        if (!(attempt < retries)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(attempt)];
                    case 2:
                        state_1 = _c.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _c.label = 3;
                    case 3:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 4: throw new Error('Max retries reached');
                }
            });
        });
    };
    BaseApiClient.checkUrl = function (url) {
        if (!url.startsWith('http://')
            && !url.startsWith('https://')) {
            throw new Error("Invalid URL: ".concat(url));
        }
        return url;
    };
    BaseApiClient.prototype.request = function (endpoint, method, body, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, response, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = BaseApiClient.checkUrl("".concat(this.baseUrl).concat(endpoint));
                        headers = __assign(__assign({}, this.headers), additionalHeaders);
                        return [4 /*yield*/, this.fetchWithTimeout({
                                url: url,
                                options: {
                                    method: method,
                                    headers: headers,
                                    body: typeof body !== 'string' ? JSON.stringify(body) : body,
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error(error.message || 'API request failed');
                    case 3: return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseApiClient.prototype.get = function (endpoint, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(endpoint, 'GET', undefined, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseApiClient.prototype.post = function (endpoint, body, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(endpoint, 'POST', body, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseApiClient.prototype.put = function (endpoint, body, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(endpoint, 'PUT', body, headers)];
            });
        });
    };
    BaseApiClient.prototype.delete = function (endpoint, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(endpoint, 'DELETE', undefined, headers)];
            });
        });
    };
    return BaseApiClient;
}());
export { BaseApiClient };
//# sourceMappingURL=client.js.map