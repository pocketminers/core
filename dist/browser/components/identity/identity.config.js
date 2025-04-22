import { ParameterFactory } from "../config/index.js";
import { Properties } from "../config/properties.storage.js";
import { BaseIdentifierTypeList, BaseIdentifierTypes } from "../../templates/v0/index.js";
var IdentityConfig = new Properties({
    items: [
        ParameterFactory.create({
            name: "format",
            description: "Format of the identity",
            default: BaseIdentifierTypes.UUID,
            required: true,
            optional: BaseIdentifierTypeList
        }),
        ParameterFactory.create({
            name: "prefix",
            description: "Prefix of the identity",
            required: false,
        }),
        ParameterFactory.create({
            name: "suffix",
            description: "Suffix of the identity",
            required: false,
        }),
        ParameterFactory.create({
            name: "length",
            description: "Length of the identity",
            default: 16,
            required: false,
        }),
        ParameterFactory.create({
            name: "seriesStart",
            description: "Starting point of the identity series",
            default: 1,
            required: false
        }),
        ParameterFactory.create({
            name: "seriesEnd",
            description: "Ending point of the identity series",
            default: 100,
            required: false
        }),
        ParameterFactory.create({
            name: "seriesStep",
            description: "Step size of the identity series",
            default: 1,
            required: false
        }),
        ParameterFactory.create({
            name: "seriesCount",
            description: "Number of identities to generate in the series",
            default: 10,
            required: false
        })
    ]
});
export { IdentityConfig };
//# sourceMappingURL=identity.config.js.map