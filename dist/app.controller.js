"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppController", {
    enumerable: true,
    get: function() {
        return AppController;
    }
});
const _common = require("@nestjs/common");
const _appservice = require("./app.service");
const _appclientconfig = require("./config/app-client-config");
const _supabaseservice = require("./supabase/supabase.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AppController = class AppController {
    async healthCheck() {
        console.log(`health check from ${(0, _appclientconfig.clientConfig)().host}:${(0, _appclientconfig.clientConfig)().port}`);
        const supabaseClient = this.supabaseService.getClient();
        const { data, error } = await supabaseClient.from('dev_post').select('*');
        if (error) {
            return {
                status: 'error',
                error: error.message
            };
        }
        return {
            status: 'ok',
            data
        };
    }
    constructor(appService, supabaseService){
        this.appService = appService;
        this.supabaseService = supabaseService;
    }
};
_ts_decorate([
    (0, _common.Get)('health'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], AppController.prototype, "healthCheck", null);
AppController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _appservice.AppService === "undefined" ? Object : _appservice.AppService,
        typeof _supabaseservice.SupabaseService === "undefined" ? Object : _supabaseservice.SupabaseService
    ])
], AppController);

//# sourceMappingURL=app.controller.js.map