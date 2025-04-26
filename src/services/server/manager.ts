import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';
import { encodeConnection, checkLists, limiter, checkPublicApiKey, checkForKubeProbe } from '@services/server/middleware/security.middleware';
import helmet from 'helmet';
import { IdentifierUtilities } from '@utilities/identifier';

class PocketServerManager {
    public id: string;
    public app: express.Application;
    private port: number;

    constructor(port: number) {
        this.id = IdentifierUtilities.generateUUIDv4();
        this.app = express();
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
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
    }

    public async start () {
        this.app.listen(this.port, async () => {
            console.log(`Server is running on port: ${this.port}`);
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