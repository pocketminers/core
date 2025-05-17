"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureHMAC = exports.sendRequest = exports.validateHMAC = exports.generateHMAC = void 0;
const crypto_1 = __importDefault(require("crypto"));
const secret_1 = require("../../../utilities/secret.js");
const SHARED_KEY = secret_1.SecretManager.getSecret("POCKET_SHARED_SECRET") || "pocketminers-defualt-shared-key-development-purposes-only";
/**
 * HMAC signature generation **Currently not used**
 */
const generateHMAC = (data) => {
    const hmac = crypto_1.default.createHmac('sha256', SHARED_KEY);
    hmac.update(data);
    return hmac.digest('hex');
};
exports.generateHMAC = generateHMAC;
const sendRequest = async () => {
    const data = 'some-data-to-secure';
    const hmac = generateHMAC(data);
    const response = await fetch('https://your-api.com/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hmac-signature': hmac,
        },
        body: JSON.stringify({ data }),
    });
    const result = await response.json();
    console.log(result);
};
exports.sendRequest = sendRequest;
const validateHMAC = (req, res, next) => {
    const clientHMAC = req.headers['x-hmac-signature'];
    const data = req.body.data;
    const hmac = crypto_1.default.createHmac('sha256', SHARED_KEY);
    hmac.update(data);
    if (clientHMAC !== hmac.digest('hex')) {
        res.status(403).json({ message: 'Invalid HMAC signature' });
    }
    next();
};
exports.validateHMAC = validateHMAC;
const configureHMAC = (app) => {
    app.post('/endpoint', validateHMAC, (req, res) => {
        res.json({ message: 'Request is valid and secure' });
    });
    app.listen(3000, () => console.log('Server running on port 3000'));
};
exports.configureHMAC = configureHMAC;
//# sourceMappingURL=encoder.js.map