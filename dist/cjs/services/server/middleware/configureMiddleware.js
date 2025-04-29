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
const limiter_middleware_1 = require("./limiter.middleware.js");
const configureMiddleware = (app) => {
    /**
     * CORS - Cross-Origin Resource Sharing
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
        optionsSuccessStatus: 200
    };
    app.use((0, cors_1.default)(corsOptions));
    /**
     * Middleware
     */
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // this.app.use(encodeConnection);
    // this.app.use(checkLists);
    // this.app.use(checkPublicApiKey);
    /**
     * Rate Limiting
     */
    app.use(limiter_middleware_1.limiter);
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