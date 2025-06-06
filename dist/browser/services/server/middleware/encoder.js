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
import crypto from 'crypto';
import { SecretManager } from '../../../utilities/secret.js';
var SHARED_KEY = SecretManager.getSecret("POCKET_SHARED_SECRET") || "pocketminers-defualt-shared-key-development-purposes-only";
/**
 * HMAC signature generation **Currently not used**
 */
var generateHMAC = function (data) {
    var hmac = crypto.createHmac('sha256', SHARED_KEY);
    hmac.update(data);
    return hmac.digest('hex');
};
var sendRequest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, hmac, response, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = 'some-data-to-secure';
                hmac = generateHMAC(data);
                return [4 /*yield*/, fetch('https://your-api.com/endpoint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-hmac-signature': hmac,
                        },
                        body: JSON.stringify({ data: data }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/];
        }
    });
}); };
var validateHMAC = function (req, res, next) {
    var clientHMAC = req.headers['x-hmac-signature'];
    var data = req.body.data;
    var hmac = crypto.createHmac('sha256', SHARED_KEY);
    hmac.update(data);
    if (clientHMAC !== hmac.digest('hex')) {
        res.status(403).json({ message: 'Invalid HMAC signature' });
    }
    next();
};
var configureHMAC = function (app) {
    app.post('/endpoint', validateHMAC, function (req, res) {
        res.json({ message: 'Request is valid and secure' });
    });
    app.listen(3000, function () { return console.log('Server running on port 3000'); });
};
export { generateHMAC, validateHMAC, sendRequest, configureHMAC };
//# sourceMappingURL=encoder.js.map