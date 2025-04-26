import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';
import { encodeConnection, checkLists, limiter, checkPublicApiKey, checkForKubeProbe } from '@services/server/middleware/security.middleware';
import helmet from 'helmet';
import { IdentifierUtilities } from '@utilities/identifier';
import { BaseArguments, BaseParameter, BaseParameters } from '@templates/v0';
import { getPocketServerParameters } from './parameters';
import { Checks } from '@utilities/checks';
import { PocketConfiguration } from '@components/configuration';
import { PocketParameter } from '@components/parameter';
import { healthRouter } from './health/routes';
import { Freezer } from '@utilities/freezer';

class PocketServerManager {
    public id: string;
    public name: string;
    public description: string;
    public version: string;
    public type: string;
    public app: express.Application;
    public config: PocketConfiguration;

    constructor({
        arguments_ = [],
        parameters_ = [],
    }: {
        arguments_?: BaseArguments;
        parameters_?: PocketParameter[];
    } = {}) {
        const serverParameters = Checks.isEmpty(parameters_) ? getPocketServerParameters() : parameters_;
        const serverArguments = Checks.isEmpty(arguments_) ? new Array() : arguments_;
        const config = new PocketConfiguration({
            args: serverArguments,
            params: serverParameters
        });

        // console.log('Server Parameters:', serverParameters);
        // console.log('Server Arguments:', serverArguments);
        // console.log('Server Configuration:', config);
        // console.log('Server Configuration:', config.preparedArgs());

        this.config = config;

        let id = config.getPreparedArgByName<string>('nodeId')?.value;
        if (
            id !== undefined 
            && Checks.isEmpty(id) == true
        ) {
            id = IdentifierUtilities.generateUUIDv4();
        }

        let name = config.getPreparedArgByName<string>('name')?.value;
        if (
            name !== undefined 
            && Checks.isEmpty(name) == true
        ) {
            name = IdentifierUtilities.generateRandomString(10);
        }

        this.id = id as string;
        this.name = name as string;

        this.type = config.getPreparedArgByName<string>('type')?.value as string;
        this.version = config.getPreparedArgByName<string>('version')?.value as string;
        this.description = config.getPreparedArgByName<string>('description')?.value as string;

        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();

        // Freezer.deepFreeze(this.app);
        // Freezer.deepFreeze(this.config);
        // Freezer.deepFreeze(this.id);
    }

    private configureMiddleware() {
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

    private configureRoutes() {
        this.app.get(`${this.type}/${this.version}/${this.name}`, healthRouter);
    }

    public async start () {
        let port: number | undefined = this.config.getPreparedArgByName<number>('port')?.value

        if (Checks.isEmpty(port)) {
            port = 3000;
        }

        this.app.listen(port, async () => {
            console.log(`Server is running on port: ${port}`);
        });
    }

    public async close () {
        this.app.disable('x-powered-by');
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(503).send('Service Unavailable');
            next();
        });
        console.log(`Server with ID: ${this.id} is closing.`);
    }
}

// Create an instance o

export { 
    PocketServerManager
};