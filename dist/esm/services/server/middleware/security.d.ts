import { Request, Response, NextFunction } from 'express';
declare const checkLists: (req: Request, res: Response, next: NextFunction) => void;
declare function checkForKubeProbe(req: Request, res: Response, next: NextFunction): Promise<any>;
declare const encodeConnection: (req: Request, res: Response, next: NextFunction) => void;
declare function checkPublicApiKey(req: Request, res: Response, next: NextFunction): Promise<any>;
declare function checkForAdminRequestHeader(req: Request, res: Response, next: NextFunction): Promise<any>;
declare function checkForShutdownCode(req: Request, res: Response, next: NextFunction): Promise<any>;
export { encodeConnection, checkLists, checkPublicApiKey, checkForKubeProbe, checkForAdminRequestHeader, checkForShutdownCode };
//# sourceMappingURL=security.d.ts.map