import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            serverId?: string;
        }
    }
}
declare const attachServerId: (id: string) => (req: Request, res: Response, next: NextFunction) => void;
export { attachServerId };
//# sourceMappingURL=attachments.d.ts.map