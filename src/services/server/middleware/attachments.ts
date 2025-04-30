import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            serverId?: string;
        }
    }
}

const attachServerId = (id: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.serverId = id;
        next();
    };
}

export {
    attachServerId
}