"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const loadAverage = require('os').loadavg();
const freeMemory = require('os').freemem();
const totalMemory = require('os').totalmem();
const platform = require('os').platform();
const router = (0, express_1.Router)();
exports.healthRouter = router;
router.get('/ping', (req, res) => {
    const requestId = req.header('x-pocket-request-id');
    res.status(200).json({
        message: 'Healthy',
        timestamp: new Date().toISOString(),
        request_id: requestId,
        // node_id: this.id
    });
});
router.get('/health', (req, res) => {
    const requestId = req.header('x-pocket-request-id');
    const upTime = Math.floor(process.uptime());
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const nodeVersion = process.version;
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
//# sourceMappingURL=routes.js.map