import express from 'express';
import cors from 'cors';

import helmet from 'helmet';
import { limiter } from './limiter.middleware';

const configureMiddleware = (app: express.Application): express.Application => {
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
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // this.app.use(encodeConnection);
    // this.app.use(checkLists);
    // this.app.use(checkPublicApiKey);
    app.use(limiter);
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

    return app
}

export {
    configureMiddleware
}