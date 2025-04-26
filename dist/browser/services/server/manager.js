var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import express from 'express';
import cors from 'cors';
import { limiter, checkPublicApiKey } from '../server/middleware/security.middleware.js';
import helmet from 'helmet';
import { IdentifierUtilities } from '../../utilities/identifier.js';
import { getPocketServerParameters } from './parameters.js';
import { Checks } from '../../utilities/checks.js';
import { PocketConfiguration } from '../../components/configuration.js';
import { healthRouter } from './health/routes.js';
var PocketServerManager = /** @class */ (function () {
    function PocketServerManager(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.arguments_, arguments_ = _c === void 0 ? [] : _c, _d = _b.parameters_, parameters_ = _d === void 0 ? [] : _d;
        var _e, _f, _g, _h, _j;
        var serverParameters = Checks.isEmpty(parameters_) ? getPocketServerParameters() : parameters_;
        var serverArguments = Checks.isEmpty(arguments_) ? new Array() : arguments_;
        var config = new PocketConfiguration({
            args: serverArguments,
            params: serverParameters
        });
        console.log('Server Parameters:', serverParameters);
        console.log('Server Arguments:', serverArguments);
        console.log('Server Configuration:', config);
        console.log('Server Configuration:', config.preparedArgs());
        this.config = config;
        var id = (_e = config.getPreparedArgByName('nodeId')) === null || _e === void 0 ? void 0 : _e.value;
        if (id !== undefined
            && Checks.isEmpty(id) == true) {
            id = IdentifierUtilities.generateUUIDv4();
        }
        var name = (_f = config.getPreparedArgByName('name')) === null || _f === void 0 ? void 0 : _f.value;
        if (name !== undefined
            && Checks.isEmpty(name) == true) {
            name = IdentifierUtilities.generateRandomString(10);
        }
        this.id = id;
        this.name = name;
        this.type = (_g = config.getPreparedArgByName('type')) === null || _g === void 0 ? void 0 : _g.value;
        this.version = (_h = config.getPreparedArgByName('version')) === null || _h === void 0 ? void 0 : _h.value;
        this.description = (_j = config.getPreparedArgByName('description')) === null || _j === void 0 ? void 0 : _j.value;
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
        // Freezer.deepFreeze(this.app);
        // Freezer.deepFreeze(this.config);
        // Freezer.deepFreeze(this.id);
    }
    PocketServerManager.prototype.configureMiddleware = function () {
        var corsOptions = {
            origin: '*',
            allowedHeaders: [
                'Content-Type',
                'accept',
                'content-type',
                'referer',
                'sec-ch-ua',
                'sec-ch-ua-mobile',
                'sec-ch-ua-platform',
                'user-agent',
                'x-pocket-public-api-key',
                'x-pocket-request-id'
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            optionsSuccessStatus: 200
        };
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        // this.app.use(encodeConnection);
        // this.app.use(checkLists);
        this.app.use(checkPublicApiKey);
        this.app.use(limiter);
        this.app.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:"],
                connectSrc: ["'self'", "dev.pocketminers.xyz/api/v0"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        }));
    };
    PocketServerManager.prototype.configureRoutes = function () {
        this.app.get("".concat(this.type, "/").concat(this.version, "/").concat(this.name), healthRouter);
    };
    PocketServerManager.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                port = (_a = this.config.getPreparedArgByName('port')) === null || _a === void 0 ? void 0 : _a.value;
                if (Checks.isEmpty(port)) {
                    port = 3000;
                }
                this.app.listen(port, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("Server is running on port: ".concat(port));
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PocketServerManager.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.app.disable('x-powered-by');
                this.app.use(function (req, res, next) {
                    res.status(503).send('Service Unavailable');
                    next();
                });
                console.log("Server with ID: ".concat(this.id, " is closing."));
                return [2 /*return*/];
            });
        });
    };
    return PocketServerManager;
}());
// Create an instance o
export { PocketServerManager };
//# sourceMappingURL=manager.js.map