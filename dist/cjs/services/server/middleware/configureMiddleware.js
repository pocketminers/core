"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const limiter_1 = require("../../server/middleware/limiter.js");
const attachments_1 = require("../../server/middleware/attachments.js");
const configureMiddleware = ({ app, serverId }) => {
    /**
     * Attach serverId to request
     * - This middleware attaches the serverId to the request object so that it can be accessed in the request handlers.
     * - This is useful for logging and debugging purposes.
     */
    app.use((0, attachments_1.attachServerId)(serverId));
    /**
     * CORS - Cross-Origin Resource Sharing
     * - This middleware enables CORS for all routes and origins.
     * - It allows the server to accept requests from different origins.
     * - This is useful for APIs that are accessed from different domains.
     * - The `origin` option specifies the allowed origins.
     * - The `credentials` option allows the server to accept cookies and authorization headers.
     * - The `exposedHeaders` option specifies the headers that are exposed to the client.
     * - The `preflightContinue` option specifies whether to pass the preflight request to the next middleware.
     * - The `allowedHeaders` option specifies the allowed headers.
     * - The `methods` option specifies the allowed HTTP methods.
     * - The `optionsSuccessStatus` option specifies the status code for successful OPTIONS requests.
     * - The `maxAge` option specifies the maximum age of the preflight request in seconds.
     */
    const corsOptions = {
        origin: [
            'http://localhost:3000',
            'https://wallet.pocketminers.xyz',
            'https://dev.pocketminers.xyz'
        ],
        credentials: true,
        exposedHeaders: [
            'x-pocket-public-api-key',
            'x-pocket-request-id'
        ],
        preflightContinue: false,
        allowedHeaders: [
            'Content-Type',
            'accept',
            'content-type',
            'referer',
            'sec-ch-ua',
            'sec-ch-ua-mobile',
            'sec-ch-ua-platform',
            'user-agent',
            'x-pocket-public-api-key',
            'x-pocket-request-id'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200,
        maxAge: 86400 // 24 hours
    };
    app.use((0, cors_1.default)(corsOptions));
    /**
     * Body Parser
     * Parse incoming request bodies in a middleware before your handlers,
     * available under the req.body property.
     * The `extended` option allows to choose between parsing the URL-encoded data
     * with the querystring library (when `false`) or the qs library (when `true`).
     */
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // this.app.use(encodeConnection);
    // this.app.use(checkLists);
    // this.app.use(checkPublicApiKey);
    /**
     * Rate Limiting
     */
    app.use(limiter_1.limiter);
    /**
     * Security Headers
     */
    app.use(helmet_1.default.referrerPolicy({ policy: 'same-origin' }));
    app.use(helmet_1.default.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'", "dev.pocketminers.xyz/api/v0"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    }));
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.xssFilter());
    app.use(helmet_1.default.noSniff());
    app.use(helmet_1.default.hidePoweredBy());
    /**
     * Compression
     */
    app.use((0, compression_1.default)({
        level: 6,
        threshold: 512,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression_1.default.filter(req, res);
        }
    }));
    /**
     * Static Files
     */
    app.use(express_1.default.static('public', {
        maxAge: '1d', // Cache static files for 1 day
    }));
    return app;
};
exports.configureMiddleware = configureMiddleware;
//# sourceMappingURL=configureMiddleware.js.map