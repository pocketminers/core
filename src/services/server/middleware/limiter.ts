import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500, 
    handler: (req: Request, res: Response) => {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
});


export {
    limiter
}