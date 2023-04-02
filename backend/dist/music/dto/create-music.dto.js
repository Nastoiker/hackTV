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
exports.CreateMusicDto = void 0;
const class_validator_1 = require("class-validator");
class CreateMusicDto {
    constructor() {
        this.userId = '';
        this.music_url = '';
    }
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Название должно быть строкой' }),
    __metadata("design:type", String)
], CreateMusicDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'ID пользователя должен быть строкой' }),
    __metadata("design:type", String)
], CreateMusicDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Алиас должен быть строкой' }),
    __metadata("design:type", String)
], CreateMusicDto.prototype, "alias", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMusicDto.prototype, "music_url", void 0);
exports.CreateMusicDto = CreateMusicDto;
//# sourceMappingURL=create-music.dto.js.map