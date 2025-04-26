import { Router, Request, Response } from 'express';

const healthRouter = Router();

healthRouter.get('/ping', (req: Request, res: Response) => {
    const requestId: string | undefined = req.header('x-pocket-request-id');
    res.status(200).json({
        message: 'Healthy',
        timestamp: new Date().toISOString(),
        request_id: requestId,
        // node_id: this.id
    });
});

export {
    healthRouter
}