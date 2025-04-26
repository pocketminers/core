import express from 'express';
import cors from 'cors';
import { limiter, checkPublicApiKey } from '../server/middleware/security.middleware.js';
import helmet from 'helmet';
import { IdentifierUtilities } from '../../utilities/identifier.js';
import { getPocketServerParameters } from './parameters.js';
import { Checks } from '../../utilities/checks.js';
import { PocketConfiguration } from '../../components/configuration.js';
import { healthRouter } from './health/routes.js';
class PocketServerManager {
    id;
    name;
    description;
    version;
    type;
    app;
    config;
    constructor({ arguments_ = [], parameters_ = [], } = {}) {
        const serverParameters = Checks.isEmpty(parameters_) ? getPocketServerParameters() : parameters_;
        const serverArguments = Checks.isEmpty(arguments_) ? new Array() : arguments_;
        const config = new PocketConfiguration({
            args: serverArguments,
            params: serverParameters
        });
        console.log('Server Parameters:', serverParameters);
        console.log('Server Arguments:', serverArguments);
        console.log('Server Configuration:', config);
        console.log('Server Configuration:', config.preparedArgs());
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
        this.configureMiddleware();
        this.configureRoutes();
        // Freezer.deepFreeze(this.app);
        // Freezer.deepFreeze(this.config);
        // Freezer.deepFreeze(this.id);
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
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        // this.app.use(encodeConnection);
        // this.app.use(checkLists);
        this.app.use(checkPublicApiKey);
        this.app.use(limiter);
        this.app.use(helmet.contentSecurityPolicy({
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
        this.app.get(`${this.type}/${this.version}/${this.name}`, healthRouter);
    }
    async start() {
        let port = this.config.getPreparedArgByName('port')?.value;
        if (Checks.isEmpty(port)) {
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
// Create an instance o
export { PocketServerManager };
//# sourceMappingURL=manager.js.map