import express from 'express';
import { BaseArguments } from '@templates/v0';
import { PocketConfiguration } from '@components/configuration';
import { PocketParameter } from '@components/parameter';
import { PocketServerStatus } from './status';
declare class PocketServerManager {
    id: string;
    name: string;
    description: string;
    version: string;
    type: string;
    app: express.Application;
    status: PocketServerStatus;
    config: PocketConfiguration;
    constructor({ arguments_, parameters_, }?: {
        arguments_?: BaseArguments;
        parameters_?: PocketParameter[];
    });
    private handleShutdown;
    private configureRoutes;
    start(): Promise<void>;
    close(): Promise<void>;
}
export { PocketServerManager };
//# sourceMappingURL=manager.d.ts.map