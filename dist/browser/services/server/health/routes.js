import { Router } from 'express';
import os from 'os';
var loadAverage = os.loadavg();
var freeMemory = os.freemem();
var totalMemory = os.totalmem();
var platform = os.platform();
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
router.get('/health', function (req, res) {
    var requestId = req.header('x-pocket-request-id');
    var upTime = Math.floor(process.uptime());
    var memoryUsage = process.memoryUsage();
    var cpuUsage = process.cpuUsage();
    var nodeVersion = process.version;
    res.status(200).json({
        message: 'Healthy',
        timestamp: new Date().toISOString(),
        request_id: requestId,
        up_time: upTime,
        memory_usage: {
            rss: memoryUsage.rss,
            heapTotal: memoryUsage.heapTotal,
            heapUsed: memoryUsage.heapUsed,
            external: memoryUsage.external,
        },
        cpu_usage: {
            user: cpuUsage.user,
            system: cpuUsage.system,
        },
        load_average: loadAverage,
        free_memory: freeMemory,
        total_memory: totalMemory,
        platform: platform,
        node_version: nodeVersion,
        server_id: req.serverId
    });
});
export { router as healthRouter };
//# sourceMappingURL=routes.js.map