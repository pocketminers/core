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
const parameters_1 = require("./parameters.js");
const checks_1 = require("../../utilities/checks.js");
const configuration_1 = require("../../components/configuration.js");
const routes_1 = require("./health/routes.js");
const admin_1 = require("./admin/index.js");
class PocketServerManager {
    id;
    name;
    description;
    version;
    type;
    app;
    config;
    constructor({ arguments_ = [], parameters_ = [], } = {}) {
        const serverParameters = checks_1.Checks.isEmpty(parameters_) ? (0, parameters_1.getPocketServerParameters)() : parameters_;
        const serverArguments = checks_1.Checks.isEmpty(arguments_) ? new Array() : arguments_;
        const config = new configuration_1.PocketConfiguration({
            args: serverArguments,
            params: serverParameters
        });
        // console.log('Server Parameters:', serverParameters);
        // console.log('Server Arguments:', serverArguments);
        // console.log('Server Configuration:', config);
        // console.log('Server Configuration:', config.preparedArgs());
        this.config = config;
        let id = config.getPreparedArgByName('nodeId')?.value;
        if (id !== undefined
            && checks_1.Checks.isEmpty(id) == true) {
            id = identifier_1.IdentifierUtilities.generateUUIDv4();
        }
        let name = config.getPreparedArgByName('name')?.value;
        if (name !== undefined
            && checks_1.Checks.isEmpty(name) == true) {
            name = identifier_1.IdentifierUtilities.generateRandomString(10);
        }
        this.id = id;
        this.name = name;
        this.type = config.getPreparedArgByName('type')?.value;
        this.version = config.getPreparedArgByName('version')?.value;
        this.description = config.getPreparedArgByName('description')?.value;
        this.app = (0, express_1.default)();
        this.configureMiddleware();
        this.configureRoutes();
        // Listen for termination signals
        process.on('SIGTERM', this.handleShutdown.bind(this));
        process.on('SIGINT', this.handleShutdown.bind(this));
    }
    async handleShutdown() {
        console.log('Shutdown signal received. Closing server...');
        if (this.app !== undefined
            && this.app !== null
            && this.app instanceof express_1.default.application) {
            await this.close();
            console.log('Server closed successfully.');
        }
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
        // this.app.use(checkPublicApiKey);
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
        this.app.use(`/${this.type}/${this.version}/${this.name}`, security_middleware_1.checkPublicApiKey, routes_1.healthRouter);
        this.app.use(`/${this.type}/${this.version}/${this.name}/admin`, security_middleware_1.checkForAdminRequestHeader, admin_1.adminRouter);
    }
    async start() {
        let port = this.config.getPreparedArgByName('port')?.value;
        if (checks_1.Checks.isEmpty(port)) {
            port = 3000;
        }
        this.app.listen(port, async () => {
            console.log(`Server is running on port: ${port}`);
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