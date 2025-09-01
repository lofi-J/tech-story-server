"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _expresssession = /*#__PURE__*/ _interop_require_default(require("express-session"));
const _appmodule = require("./app.module");
const _appclientconfig = require("./config/app-client-config");
require("./types/session.types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    // Session configuration
    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
        console.error('경고: SESSION_SECRET 환경변수가 설정되지 않았습니다!');
        if (process.env.NODE_ENV === 'production') {
            throw new Error('SESSION_SECRET 환경변수는 프로덕션에서 필수입니다!');
        }
    }
    app.use((0, _expresssession.default)({
        secret: sessionSecret || 'dev-fallback-secret-change-in-production',
        resave: false,
        saveUninitialized: false,
        name: 'jera_s',
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 6 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
        }
    }));
    // Global validation pipe
    app.useGlobalPipes(new _common.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    // app configuration
    app.enableCors({
        origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL || true // 프로덕션에서는 FRONTEND_URL 환경변수 사용, 없으면 모든 origin 허용
         : [
            `http://${(0, _appclientconfig.clientConfig)().host}:${(0, _appclientconfig.clientConfig)().port}`,
            `https://${(0, _appclientconfig.clientConfig)().host}:${(0, _appclientconfig.clientConfig)().port}`
        ],
        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'PATCH',
            'OPTIONS'
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Apollo-Require-Preflight'
        ],
        credentials: true
    });
    await app.listen(process.env.DEFAULT_PORT ?? 3000);
    console.log(`App is running on port ${process.env.DEFAULT_PORT ?? 3000}`);
}
void bootstrap();

//# sourceMappingURL=main.js.map