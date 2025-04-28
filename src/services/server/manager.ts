import express, { Request, Response, NextFunction } from 'express';


import { checkPublicApiKey, checkForAdminRequestHeader, checkForShutdownCode } from '@services/server/middleware/security.middleware';
import { IdentifierUtilities } from '@utilities/identifier';
import { BaseArguments } from '@templates/v0';
import { getPocketServerParameters } from './parameters';
import { Checks } from '@utilities/checks';
import { PocketConfiguration } from '@components/configuration';
import { PocketParameter } from '@components/parameter';
import { healthRouter } from './health/routes';
import { Freezer } from '@utilities/freezer';
import { adminRouter } from './admin';
import { configureMiddleware } from './middleware/configureMiddleware';

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
        this.app = configureMiddleware(this.app);
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
        Freezer.deepFreeze(this.app);
        Freezer.deepFreeze(this.config);
    }

    private async handleShutdown() {
        console.log('Shutdown signal received. Closing server...');

        if (
            this.app !== undefined
            && this.app !== null
            && this.app instanceof express.application
        ) {
            await this.close();
            console.log('Server closed successfully.');
        }
    }



    private configureRoutes() {
        this.app.use(`/${this.type}/${this.version}/${this.name}`, checkPublicApiKey, healthRouter);
        this.app.use(`/${this.type}/${this.version}/${this.name}/admin`, checkForAdminRequestHeader, checkForShutdownCode, adminRouter);
    }

    public async start () {
        let port: number | undefined = this.config.getPreparedArgByName<number>('port')?.value

        if (Checks.isEmpty(port)) {
            port = 3000;
        }

        this.app.listen(port, async () => {
            console.log(`Server is running on port: ${port}`)
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