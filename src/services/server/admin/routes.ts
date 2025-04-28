import { Checks } from '@utilities/checks';
import { SecretManager } from '@utilities/secret';
import { Router, Request, Response } from 'express';
import { checkForAdminRequestHeader, checkForShutdownCode } from '../middleware';

const router = Router();


router.post(
    '/shutdown',
    ((req: Request, res: Response) => {
        res.status(200).json({
            message: 'Server is shutting down...',
            request_id: req.header('x-pocket-request-id'),
        });

        setTimeout(() => {
            process.exit(0);
        }, 1000);
    })
);


export {
    router as adminRouter
}