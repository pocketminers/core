import { Request, Response, NextFunction } from 'express';
declare const limiter: any;
declare const checkLists: (req: Request, res: Response, next: NextFunction) => void;
declare function checkForKubeProbe(req: Request, res: Response, next: NextFunction): Promise<any>;
declare const encodeConnection: (req: Request, res: Response, next: NextFunction) => any;
declare function checkPublicApiKey(req: Request, res: Response, next: NextFunction): Promise<any>;
export { encodeConnection, checkLists, limiter, checkPublicApiKey, checkForKubeProbe };
//# sourceMappingURL=security.middleware.d.ts.map