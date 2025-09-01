"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_client_config_1 = require("./config/app-client-config");
const supabase_service_1 = require("./supabase/supabase.service");
let AppController = class AppController {
    appService;
    supabaseService;
    constructor(appService, supabaseService) {
        this.appService = appService;
        this.supabaseService = supabaseService;
    }
    async healthCheck() {
        console.log(`health check from ${(0, app_client_config_1.clientConfig)().host}:${(0, app_client_config_1.clientConfig)().port}`);
        const supabaseClient = this.supabaseService.getClient();
        const { data, error } = await supabaseClient.from('dev_post').select('*');
        if (error) {
            return {
                status: 'error',
                error: error.message,
            };
        }
        return {
            status: 'ok',
            data,
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "healthCheck", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        supabase_service_1.SupabaseService])
], AppController);
//# sourceMappingURL=app.controller.js.map