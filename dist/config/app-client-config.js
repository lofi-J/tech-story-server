"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "clientConfig", {
    enumerable: true,
    get: function() {
        return clientConfig;
    }
});
const _config = require("@nestjs/config");
const clientConfig = (0, _config.registerAs)('client', ()=>({
        port: process.env.CLIENT_PORT ?? 3000,
        host: process.env.CLIENT_HOST ?? 'localhost'
    }));

//# sourceMappingURL=app-client-config.js.map