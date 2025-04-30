import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { limiter } from '@services/server/middleware/limiter';
import { attachServerId } from '@services/server/middleware/attachments';



const configureMiddleware = ({
    app,
    serverId
}: {
    app: express.Application;
    serverId: string;
}): express.Application => {
    /**
     * Attach serverId to request
     * - This middleware attaches the serverId to the request object so that it can be accessed in the request handlers.
     * - This is useful for logging and debugging purposes.
     */
    app.use(attachServerId(serverId));

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
    app.use(cors(corsOptions));

    /**
     * Body Parser
     * Parse incoming request bodies in a middleware before your handlers,
     * available under the req.body property.
     * The `extended` option allows to choose between parsing the URL-encoded data
     * with the querystring library (when `false`) or the qs library (when `true`).
     */
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // this.app.use(encodeConnection);
    // this.app.use(checkLists);
    // this.app.use(checkPublicApiKey);

    /**
     * Rate Limiting
     */
    app.use(limiter);

    /**
     * Security Headers
     */
    app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    app.use(helmet.contentSecurityPolicy({
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
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());

    /**
     * Compression
     */
    app.use(compression({
        level: 6,
        threshold: 512,
        filter: (req: Request, res: Response) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression.filter(req, res);
        }
    }));

    /**
     * Static Files
     */
    app.use(express.static('public', {
        maxAge: '1d', // Cache static files for 1 day
    }));


    return app
}

export {
    configureMiddleware
}