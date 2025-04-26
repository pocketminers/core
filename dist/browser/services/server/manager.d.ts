import express from 'express';
declare class PocketServerManager {
    id: string;
    app: express.Application;
    private port;
    constructor(port: number);
    private configureMiddleware;
    private configureRoutes;
    start(): Promise<void>;
    close(): Promise<void>;
}
export { PocketServerManager };
//# sourceMappingURL=manager.d.ts.map