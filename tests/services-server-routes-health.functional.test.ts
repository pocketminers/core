import request from 'supertest';
import { PocketServerManager } from '@services/server';
import { runServer } from '@services/server';
import { SecretManager } from '@utilities/secret';
import { IdentifierUtilities } from '@utilities/identifier';
import { Application } from 'express';

describe('PocketServer Health Routes', () => {
    let serverManager: PocketServerManager;
    let app: Express.Application;

    beforeEach(async () => {
        serverManager = await runServer({
            args: [
                {
                    name: 'nodeId',
                    value: 'test-node-id',
                },
                {
                    name: 'name',
                    value: 'test-name',
                },
                {
                    name: 'description',
                    value: 'test-description',
                },
                {
                    name: 'version',
                    value: 'v0',
                },
                {
                    name: 'type',
                    value: 'api',
                },
                {
                    name: 'port',
                    value: '3000',
                }
            ]
        });

        app = serverManager.app;
    });

    afterEach( async () => {
        await serverManager.close();
    });

    it('should respond to GET /api/v0/test-name/ping', async () => {

        const response = await request(app as Application)
            .get('/api/v0/test-name/ping')
            .set('Accept', 'application/json')
            .set('x-pocket-public-api-key', 'txt:' + SecretManager.getSecret('POCKET_PUBLIC_API_KEY', { inReact: true }))
            .set('x-pocket-request-id', 'txt:' + IdentifierUtilities.generateUUIDv4())
            .set('Content-Type', 'application/json')
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Healthy");
    });

    it('should respond to GET /api/v0/test-name/health', async () => {
        const response = await request(app as Application)
            .get('/api/v0/test-name/health')
            .set('Accept', 'application/json')
            .set('x-pocket-public-api-key', 'txt:' + SecretManager.getSecret('POCKET_PUBLIC_API_KEY', { inReact: true }))
            .set('x-pocket-request-id', 'txt:' + IdentifierUtilities.generateUUIDv4())
            .set('Content-Type', 'application/json')

        console.log(`response: ${JSON.stringify(response.body, null, 2)}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Healthy");
        expect(response.body.server_id).toEqual(serverManager.id);
    });

});