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
import { APIClient } from "@wharfkit/antelope";
/**
 * EOS Blockchain Utility
 * - Utilizes EOS tools from Antelope
 */
var EOS = /** @class */ (function () {
    function EOS() {
    }
    /**
     * Chain definition for EOS based chains
     * @external https://validate.eosnation.io/wax/reports/endpoints.html
     */
    EOS.Chain = function (chainName) {
        switch (chainName) {
            case 'WAX':
                return {
                    id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
                    url: 'https://wax.greymass.com'
                };
            default:
                return EOS.Chain('WAX');
        }
    };
    /**
     * Create an API client
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api
     */
    EOS.ApiClient = function (options) {
        return new APIClient(__assign({ url: EOS.Chain('WAX').url }, options));
    };
    /**
     * Get the chain info
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_info
     */
    EOS.getChainInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EOS.ApiClient().call({
                            method: 'POST',
                            path: '/v1/chain/get_info'
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EOS.getBlock = function (blockNum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EOS.ApiClient().call({
                            method: 'POST',
                            path: '/v1/chain/get_block',
                            params: { block_num_or_id: blockNum }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EOS.getBlockInfo = function (blockNum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EOS.ApiClient().call({
                            method: 'POST',
                            path: '/v1/chain/get_block_info',
                            params: { block_num: blockNum }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get an account from an account name
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_account
     */
    EOS.getAccountFromAccountName = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var account;
            var accountName = _b.accountName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, EOS.ApiClient().call({
                            method: 'POST',
                            path: '/v1/chain/get_account',
                            params: { account_name: accountName }
                        })];
                    case 1:
                        account = _c.sent();
                        return [2 /*return*/, account];
                }
            });
        });
    };
    /**
     * Get the balance of an account
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_currency_balance
     */
    EOS.getBalanceFromAccountName = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var account;
            var accountName = _b.accountName, token = _b.token, contract = _b.contract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, EOS.getAccountFromAccountName({ accountName: accountName })];
                    case 1:
                        account = _c.sent();
                        return [4 /*yield*/, EOS.ApiClient().call({
                                method: 'POST',
                                path: '/v1/chain/get_currency_balance',
                                params: { code: contract, account: accountName, symbol: token }
                            })];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    return EOS;
}());
export { EOS };
//# sourceMappingURL=eos.js.map