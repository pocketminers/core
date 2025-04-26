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
        
    });

    it('should create a PocketServerManager instance', async () => {
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

        expect(app).toBeDefined();
    });

    it('should respond to GET /', async () => {
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

        const response = await request(app as Application).get('/api/v0/test-name/ping')
        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            message: 'Forbidden'
        });
    });

    it('should respond to GET /api/v0/test-name/ping', async () => {
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

        const response = await request(app as Application)
            .get('/api/v0/test-name/ping')
            .set('Accept', 'application/json')
            .set('x-pocket-public-api-key', 'txt:' + SecretManager.getSecret('POCKET_PUBLIC_API_KEY', { inReact: true }))
            .set('x-pocket-request-id', 'txt:' + IdentifierUtilities.generateUUIDv4())
            .set('Content-Type', 'application/json')
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Healthy");
    });
});
