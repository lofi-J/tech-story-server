"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const express_session_1 = __importDefault(require("express-session"));
const app_module_1 = require("./app.module");
const app_client_config_1 = require("./config/app-client-config");
require("./types/session.types");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        name: 'jera_s',
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 6 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        },
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: process.env.NODE_ENV === 'production'
            ? undefined
            : [
                `http://${(0, app_client_config_1.clientConfig)().host}:${(0, app_client_config_1.clientConfig)().port}`,
                `https://${(0, app_client_config_1.clientConfig)().host}:${(0, app_client_config_1.clientConfig)().port}`,
            ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Apollo-Require-Preflight',
        ],
        credentials: true,
    });
    await app.listen(process.env.DEFAULT_PORT ?? 3000);
    console.log(`App is running on port ${process.env.DEFAULT_PORT ?? 3000}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map