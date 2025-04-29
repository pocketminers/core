import crypto from 'crypto';
import { SecretManager } from '../../../utilities/secret.js';
import { Checks } from '../../../utilities/checks.js';
// Configuration
const SHARED_KEY = process.env.POCKET_SHARED_SECRET || "pocketminers-defualt-shared-key-development-purposes-only";
const WHITELIST = ['127.0.0.1'];
const BLACKLIST = ['192.168.1.1'];
// Middleware to check blacklist and whitelist
const checkLists = (req, res, next) => {
    const clientIp = req.ip;
    if (clientIp?.startsWith('10.')) { }
    if (clientIp?.startsWith('192.168.')
        || clientIp?.startsWith('172.')) {
        res.status(403).json({ message: 'Forbidden' });
    }
    // if (WHITELIST.includes(clientIp)) {
    //     return next();
    // }
    next();
};
async function checkForKubeProbe(req, res, next) {
    if (req.headers['user-agent']?.startsWith('kube-probe')) {
        return res.status(200).json({ message: 'OK' });
    }
    next();
}
// Middleware to encode connections using a shared key
const encodeConnection = (req, res, next) => {
    const hmac = crypto.createHmac('sha256', SHARED_KEY);
    hmac.update(req.headers['if-none-match'] || '');
    if (req.headers['user-agent']?.startsWith('kube-probe')) {
        return next();
    }
    // if (req.headers['x-encoded-if-none-match'] !== hmac.digest('hex')) {
    //     res.status(403).json({ message: 'Forbidden' });
    // }
    // req.headers['if-none-match'] = hmac.digest('hex');
    // req.headers['x-encoded-ip'] = hmac.digest('hex');
    // next();
    // console.log('ip: ', req.ip);
    // console.log('headers: ', req.headers);
    next();
};
async function checkPublicApiKey(req, res, next) {
    try {
        if (req.headers['user-agent']?.startsWith('kube-probe')) {
            return next();
        }
        const publicApiKey = req.header('x-pocket-public-api-key');
        if (typeof publicApiKey !== 'string'
            || !publicApiKey
            || publicApiKey === null
            || publicApiKey.length < 1
            || publicApiKey.length > 100
            || publicApiKey.includes(' ')
            || publicApiKey.includes(',')
            || publicApiKey.includes(';')
            || publicApiKey.includes('=')
            // || publicApiKey.includes(':') 
            || publicApiKey.includes('"')
            || publicApiKey.includes("'")) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const PublicKeyInConfig = process.env.POCKET_PUBLIC_API_KEY;
        if (publicApiKey?.startsWith('txt:') && publicApiKey === ('txt:' + PublicKeyInConfig)) {
            return next();
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    next();
}
async function checkForAdminRequestHeader(req, res, next) {
    const adminRequestId = SecretManager.getSecret('POCKET_SERVICE_ADMIN_REQUEST_ID', { inReact: false });
    const requestId = req.header('x-pocket-request-id');
    if (Checks.isEmpty(requestId) === false
        && requestId !== adminRequestId) {
        return res.status(403).json({
            message: 'Admin Request Header Invalid - Forbidden',
            request_id: requestId,
        });
    }
    if (Checks.isEmpty(requestId) === false
        && requestId === adminRequestId) {
        return next();
    }
}
async function checkForShutdownCode(req, res, next) {
    const adminShutdownCode = SecretManager.getSecret('POCKET_SERVICE_ADMIN_SHUTDOWN_CODE');
    const shutdownCode = req.body['x-pocket-service-shutdown-code'];
    if (Checks.isEmpty(shutdownCode) === false
        && shutdownCode !== adminShutdownCode) {
        return res.status(403).json({
            message: 'Invalid Shutdown Code - Forbidden',
            request_id: req.header('x-pocket-request-id'),
        });
    }
    if (Checks.isEmpty(shutdownCode) === false
        && shutdownCode === adminShutdownCode) {
        return next();
    }
}
export { encodeConnection, checkLists, checkPublicApiKey, checkForKubeProbe, checkForAdminRequestHeader, checkForShutdownCode };
//# sourceMappingURL=security.middleware.js.map