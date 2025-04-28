import { Router } from 'express';
var router = Router();
router.post('/shutdown', (function (req, res) {
    res.status(200).json({
        message: 'Server is shutting down...',
        request_id: req.header('x-pocket-request-id'),
    });
    setTimeout(function () {
        process.exit(0);
    }, 1000);
}));
export { router as adminRouter };
//# sourceMappingURL=routes.js.map