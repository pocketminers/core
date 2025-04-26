"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketServerManager = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const security_middleware_1 = require("../server/middleware/security.middleware.js");
const helmet_1 = __importDefault(require("helmet"));
const identifier_1 = require("../../utilities/identifier.js");
class PocketServerManager {
    id;
    app;
    port;
    constructor(port) {
        this.id = identifier_1.IdentifierUtilities.generateUUIDv4();
        this.app = (0, express_1.default)();
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
    }
    configureMiddleware() {
        const corsOptions = {
            origin: '*',
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
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        // this.app.use(encodeConnection);
        // this.app.use(checkLists);
        this.app.use(security_middleware_1.checkPublicApiKey);
        this.app.use(security_middleware_1.limiter);
        this.app.use(helmet_1.default.contentSecurityPolicy({
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
    }
    configureRoutes() {
    }
    async start() {
        this.app.listen(this.port, async () => {
            console.log(`Server is running on port: ${this.port}`);
        });
    }
    async close() {
        this.app.disable('x-powered-by');
        this.app.use((req, res, next) => {
            res.status(503).send('Service Unavailable');
            next();
        });
        console.log(`Server with ID: ${this.id} is closing.`);
    }
}
exports.PocketServerManager = PocketServerManager;
//# sourceMappingURL=manager.js.map