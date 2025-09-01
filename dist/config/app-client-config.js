"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientConfig = void 0;
const config_1 = require("@nestjs/config");
exports.clientConfig = (0, config_1.registerAs)('client', () => ({
    port: process.env.CLIENT_PORT ?? 3000,
    host: process.env.CLIENT_HOST ?? 'localhost',
}));
//# sourceMappingURL=app-client-config.js.map