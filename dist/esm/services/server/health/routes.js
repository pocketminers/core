import { Router } from 'express';
const healthRouter = Router();
healthRouter.get('/ping', (req, res) => {
    const requestId = req.header('x-pocket-request-id');
    res.status(200).json({
        message: 'Healthy',
        timestamp: new Date().toISOString(),
        request_id: requestId,
        // node_id: this.id
    });
});
export { healthRouter };
//# sourceMappingURL=routes.js.map