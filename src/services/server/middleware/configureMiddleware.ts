import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { limiter } from './limiter.middleware';

const configureMiddleware = (app: express.Application): express.Application => {

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
    app.use(cors(corsOptions));

    /**
     * Middleware
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