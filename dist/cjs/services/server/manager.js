"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketServerManager = void 0;
const express_1 = __importDefault(require("express"));
const security_1 = require("../server/middleware/security.js");
const identifier_1 = require("../../utilities/identifier.js");
const parameters_1 = require("./parameters.js");
const checks_1 = require("../../utilities/checks.js");
const configuration_1 = require("../../components/configuration.js");
const routes_1 = require("./health/routes.js");
const freezer_1 = require("../../utilities/freezer.js");
const admin_1 = require("./admin/index.js");
const configureMiddleware_1 = require("./middleware/configureMiddleware.js");
class PocketServerManager {
    id;
    name;
    description;
    version;
    type;
    app;
    status = 'OFFLINE';
    config;
    constructor({ arguments_ = [], parameters_ = [], } = {}) {
        this.status = 'INITIALIZING';
        const serverParameters = checks_1.Checks.isEmpty(parameters_) ? (0, parameters_1.getPocketServerParameters)() : parameters_;
        const serverArguments = checks_1.Checks.isEmpty(arguments_) ? new Array() : arguments_;
        const config = new configuration_1.PocketConfiguration({
            args: serverArguments,
            params: serverParameters
        });
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
        this.app = (0, configureMiddleware_1.configureMiddleware)({ app: this.app, serverId: this.id });
        this.configureRoutes();
        // Listen for termination signals
        process.on('SIGTERM', this.handleShutdown.bind(this));
        process.on('SIGINT', this.handleShutdown.bind(this));
        // Freeze the app details
        freezer_1.Freezer.deepFreeze(this.id);
        freezer_1.Freezer.deepFreeze(this.name);
        freezer_1.Freezer.deepFreeze(this.description);
        freezer_1.Freezer.deepFreeze(this.version);
        freezer_1.Freezer.deepFreeze(this.type);
        // Freezer.deepFreeze(this.app);
        freezer_1.Freezer.deepFreeze(this.config);
        this.status = 'READY';
    }
    async handleShutdown() {
        if (this.status === 'STOPPING') {
            console.log('Server is already stopping. Ignoring shutdown signal.');
            return;
        }
        if (this.status === 'OFFLINE') {
            console.log('Server is already offline. Ignoring shutdown signal.');
            return;
        }
        if (this.status === 'ONLINE') {
            console.log('Server is online. Preparing to close...');
            this.status = 'STOPPING';
            await this.close();
            console.log('Server closed successfully.');
        }
        else {
            console.log(`Server is ${this.status}. Preparing to close...`);
        }
        this.status = 'OFFLINE';
    }
    configureRoutes() {
        this.app.use(`/${this.type}/${this.version}/${this.name}`, security_1.checkPublicApiKey, routes_1.healthRouter);
        this.app.use(`/${this.type}/${this.version}/${this.name}/admin`, security_1.checkForAdminRequestHeader, security_1.checkForShutdownCode, admin_1.adminRouter);
    }
    async start() {
        let port = this.config.getPreparedArgByName('port')?.value;
        if (checks_1.Checks.isEmpty(port)) {
            port = 3000;
        }
        await this.app.listen(port, async () => {
            console.log(`Server ${this.id} is running a/n ${this.type} service named ${this.name} on port: ${port}`);
        });
        this.status = 'ONLINE';
    }
    async close() {
        this.app.disable('x-powered-by');
        this.app.use((req, res, next) => {
            res.status(503).send('Service Unavailable');
            next();
        });
        console.log(`Server with ID: ${this.id} is closing.`);
        this.status = 'OFFLINE';
    }
}
exports.PocketServerManager = PocketServerManager;
//# sourceMappingURL=manager.js.map