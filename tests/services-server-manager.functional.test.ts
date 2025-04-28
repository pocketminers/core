import request from 'supertest';
import { PocketServerManager } from '@services/server';
import { runServer } from '@services/server';
import { Application } from 'express';
import { IdentifierUtilities } from '@utilities/identifier';
import { SecretManager } from '@utilities/secret';

describe('PocketServerManager', () => {
    let serverManager: PocketServerManager;
    let app: Express.Application;

    beforeEach(async () => {
        app = await runServer({
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
    });

    it('should be frozen', () => {
        const serverManager = new PocketServerManager({
            arguments_: [
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

        const frozenApp = serverManager.app;
        const frozenConfig = serverManager.config;
        const frozenId = serverManager.id;
        const frozenName = serverManager.name;
        const frozenDescription = serverManager.description;

        expect(frozenApp).toBeDefined();
        expect(frozenConfig).toBeDefined();
        expect(frozenId).toBeDefined();
        expect(frozenName).toBeDefined();
        expect(frozenDescription).toBeDefined();
        expect(Object.isFrozen(frozenApp)).toBe(true);
        expect(Object.isFrozen(frozenConfig)).toBe(true);
        expect(Object.isFrozen(frozenId)).toBe(true);
        expect(Object.isFrozen(frozenName)).toBe(true);
        expect(Object.isFrozen(frozenDescription)).toBe(true);

        try {
            serverManager.app = {} as any;
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });



    it('should create a PocketServerManager instance', async () => {
        expect(app).toBeDefined();
    });

    it('should respond to GET /', async () => {
        const response = await request(app as Application).get('/api/v0/test-name/ping')
        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            message: 'Forbidden'
        });
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

    it('should respond to POST /api/v0/test-name/shutdown', async () => {

        const response = await request(app as Application)
            .post('/api/v0/test-name/admin/shutdown')
            .set('Accept', 'application/json')
            .set('x-pocket-public-api-key', 'txt:' + SecretManager.getSecret('POCKET_PUBLIC_API_KEY', { inReact: true }))
            .set('x-pocket-request-id', SecretManager.getSecret('POCKET_SERVICE_ADMIN_REQUEST_ID', { inReact: false }) || 'default-request-id')
            .set('Content-Type', 'application/json')
            .send({
                'x-pocket-service-shutdown-code': SecretManager.getSecret('POCKET_SERVICE_ADMIN_SHUTDOWN_CODE', { inReact: false }) || 'default-shutdown-code'
            });
        console.log('response: ', response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Server is shutting down...");
    });
});
