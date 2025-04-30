import { Router, Request, Response } from 'express';
const loadAverage: number[] = require('os').loadavg();
const freeMemory: number = require('os').freemem();
const totalMemory: number = require('os').totalmem();
const platform: string = require('os').platform();


const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    const requestId: string | undefined = req.header('x-pocket-request-id');
    res.status(200).json({
        message: 'Healthy',
        timestamp: new Date().toISOString(),
        request_id: requestId,
        // node_id: this.id
    });
});

router.get('/health', (req: Request, res: Response) => {
    const requestId: string | undefined = req.header('x-pocket-request-id');
    const upTime: number = Math.floor(process.uptime());
    const memoryUsage: NodeJS.MemoryUsage = process.memoryUsage();
    const cpuUsage: NodeJS.CpuUsage = process.cpuUsage();
    const nodeVersion: string = process.version;

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


export {
    router as healthRouter
}