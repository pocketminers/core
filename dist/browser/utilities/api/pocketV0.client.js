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
import { SecretManager } from "@utilities/secret";
import { BaseApiClient } from "./client";
import { IdentifierUtilities } from "@utilities/identifier";
var PocketV0Client = /** @class */ (function (_super) {
    __extends(PocketV0Client, _super);
    function PocketV0Client() {
        var baseUrl = SecretManager.getSecret('POCKET_SERVICE_API_V0_URL') || 'https://dev.pocketminers.xyz/api/v0';
        var pocketApiKey = SecretManager.getSecret('POCKET_PUBLIC_API_KEY');
        return _super.call(this, {
            baseUrl: baseUrl,
            headers: {
                'x-pocket-public-api-key': "txt:".concat(pocketApiKey),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': 'PocketClient/1.0'
            }
        }) || this;
    }
    PocketV0Client.prototype.createPocketRequestHeaders = function () {
        var requestId = "txt:".concat(IdentifierUtilities.generateUUIDv4());
        return __assign(__assign({}, this.headers), { 'x-pocket-request-id': requestId });
    };
    return PocketV0Client;
}(BaseApiClient));
export { PocketV0Client };
//# sourceMappingURL=pocketV0.client.js.map