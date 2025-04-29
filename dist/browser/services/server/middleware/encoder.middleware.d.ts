import express, { Request, Response, NextFunction } from 'express';
/**
 * HMAC signature generation **Currently not used**
 */
declare const generateHMAC: (data: string) => string;
declare const sendRequest: () => Promise<void>;
declare const validateHMAC: (req: Request, res: Response, next: NextFunction) => void;
declare const configureHMAC: (app: express.Application) => void;
export { generateHMAC, validateHMAC, sendRequest, configureHMAC };
//# sourceMappingURL=encoder.middleware.d.ts.map