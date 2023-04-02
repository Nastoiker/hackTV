"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertVideoModule = void 0;
const common_1 = require("@nestjs/common");
const convert_video_service_1 = require("./convert-video.service");
const convert_video_controller_1 = require("./convert-video.controller");
let ConvertVideoModule = class ConvertVideoModule {
};
ConvertVideoModule = __decorate([
    (0, common_1.Module)({
        controllers: [convert_video_controller_1.ConvertVideoController],
        providers: [convert_video_service_1.ConvertVideoService]
    })
], ConvertVideoModule);
exports.ConvertVideoModule = ConvertVideoModule;
//# sourceMappingURL=convert-video.module.js.map