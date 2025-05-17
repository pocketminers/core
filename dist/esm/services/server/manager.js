import express from 'express';
import { checkPublicApiKey, checkForAdminRequestHeader, checkForShutdownCode } from '../server/middleware/security.js';
import { IdentifierUtilities } from '../../utilities/identifier.js';
import { getPocketServerParameters } from './parameters.js';
import { Checks } from '../../utilities/checks.js';
import { PocketConfiguration } from '../../components/common/configuration.js';
import { healthRouter } from './health/routes.js';
import { Freezer } from '../../utilities/freezer.js';
import { adminRouter } from './admin/index.js';
import { configureMiddleware } from './middleware/configureMiddleware.js';
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
        const serverParameters = Checks.isEmpty(parameters_) ? getPocketServerParameters() : parameters_;
        const serverArguments = Checks.isEmpty(arguments_) ? new Array() : arguments_;
        const config = new PocketConfiguration({
            args: serverArguments,
            params: serverParameters
        });
        this.config = config;
        let id = config.getPreparedArgByName('nodeId')?.value;
        if (id !== undefined
            && Checks.isEmpty(id) == true) {
            id = IdentifierUtilities.generateUUIDv4();
        }
        let name = config.getPreparedArgByName('name')?.value;
        if (name !== undefined
            && Checks.isEmpty(name) == true) {
            name = IdentifierUtilities.generateRandomString(10);
        }
        this.id = id;
        this.name = name;
        this.type = config.getPreparedArgByName('type')?.value;
        this.version = config.getPreparedArgByName('version')?.value;
        this.description = config.getPreparedArgByName('description')?.value;
        this.app = express();
        this.app = configureMiddleware({ app: this.app, serverId: this.id });
        this.configureRoutes();
        // Listen for termination signals
        process.on('SIGTERM', this.handleShutdown.bind(this));
        process.on('SIGINT', this.handleShutdown.bind(this));
        // Freeze the app details
        Freezer.deepFreeze(this.id);
        Freezer.deepFreeze(this.name);
        Freezer.deepFreeze(this.description);
        Freezer.deepFreeze(this.version);
        Freezer.deepFreeze(this.type);
        // Freezer.deepFreeze(this.app);
        Freezer.deepFreeze(this.config);
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
        this.app.use(`/${this.type}/${this.version}/${this.name}`, checkPublicApiKey, healthRouter);
        this.app.use(`/${this.type}/${this.version}/${this.name}/admin`, checkForAdminRequestHeader, checkForShutdownCode, adminRouter);
    }
    async start() {
        let port = this.config.getPreparedArgByName('port')?.value;
        if (Checks.isEmpty(port)) {
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
export { PocketServerManager };
//# sourceMappingURL=manager.js.map