"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityConfig = void 0;
const config_1 = require("../config/index.js");
const properties_storage_1 = require("../config/properties.storage.js");
const v0_1 = require("../../templates/v0/index.js");
const IdentityConfig = new properties_storage_1.Properties({
    items: [
        config_1.ParameterFactory.create({
            name: "format",
            description: "Format of the identity",
            default: v0_1.BaseIdentifierTypes.UUID,
            required: true,
            optional: v0_1.BaseIdentifierTypeList
        }),
        config_1.ParameterFactory.create({
            name: "prefix",
            description: "Prefix of the identity",
            required: false,
        }),
        config_1.ParameterFactory.create({
            name: "suffix",
            description: "Suffix of the identity",
            required: false,
        }),
        config_1.ParameterFactory.create({
            name: "length",
            description: "Length of the identity",
            default: 16,
            required: false,
        }),
        config_1.ParameterFactory.create({
            name: "seriesStart",
            description: "Starting point of the identity series",
            default: 1,
            required: false
        }),
        config_1.ParameterFactory.create({
            name: "seriesEnd",
            description: "Ending point of the identity series",
            default: 100,
            required: false
        }),
        config_1.ParameterFactory.create({
            name: "seriesStep",
            description: "Step size of the identity series",
            default: 1,
            required: false
        }),
        config_1.ParameterFactory.create({
            name: "seriesCount",
            description: "Number of identities to generate in the series",
            default: 10,
            required: false
        })
    ]
});
exports.IdentityConfig = IdentityConfig;
//# sourceMappingURL=identity.config.js.map