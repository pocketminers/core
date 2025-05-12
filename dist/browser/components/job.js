var PocketJob = /** @class */ (function () {
    function PocketJob(_a) {
        var id = _a.id, name = _a.name, description = _a.description, parameters = _a.parameters, createdAt = _a.createdAt, commands = _a.commands, instance = _a.instance, status = _a.status, updatedAt = _a.updatedAt, startedAt = _a.startedAt, finishedAt = _a.finishedAt;
        this.data = {
            id: id,
            name: name,
            description: description,
            parameters: parameters,
            createdAt: createdAt,
            commands: commands,
            instance: instance,
            status: status,
            updatedAt: updatedAt,
            startedAt: startedAt,
            finishedAt: finishedAt
        };
    }
    return PocketJob;
}());
export { PocketJob };
//# sourceMappingURL=job.js.map