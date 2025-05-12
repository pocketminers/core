import { PocketServerManager } from "@services/server";


describe("PocketServerManager", () => {
    let serverManager: PocketServerManager;

    beforeEach(() => {
        serverManager = new PocketServerManager({
            arguments_: [{
                name: "nodeId",
                value: "test-node-id",
            },
            {
                name: "name",
                value: "test-name",
            },
            {
                name: "description",
                value: "test-description",
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
            }]
        });
    });

    it("should create a PocketServerManager instance", () => {
        expect(serverManager).toBeInstanceOf(PocketServerManager);
    });

    it("should have an id", () => {
        expect(serverManager.id).toBeDefined();
        expect(serverManager.id).toBe("test-node-id");
    });

    it("should have an app", () => {
        expect(serverManager.app).toBeDefined();
    });

    it("should have a name", () => {
        expect(serverManager.name).toBeDefined();
        expect(serverManager.name).toBe("test-name");
    });

    it("should have a description", () => {
        expect(serverManager.description).toBeDefined();
        expect(serverManager.description).toBe("test-description");
    });

    it("should have a version", () => {
        expect(serverManager.version).toBeDefined();
        expect(serverManager.version).toBe("v0");
    });

    it("should have a type", () => {
        expect(serverManager.type).toBeDefined();
        expect(serverManager.type).toBe("api");
    });

    it("should have a config", () => {
        expect(serverManager.config).toBeDefined();
    });

});