import { Router } from 'express';
var router = Router();
router.get('/ping', function (req, res) {
    var requestId = req.header('x-pocket-request-id');
    res.status(200).json({
        message: 'Healthy',
        timestamp: new Date().toISOString(),
        request_id: requestId,
        // node_id: this.id
    });
});
export { router as healthRouter };
//# sourceMappingURL=routes.js.map