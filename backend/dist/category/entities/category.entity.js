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
exports.SecondLevelCategory = exports.FirstLevelCategory = void 0;
const class_validator_1 = require("class-validator");
class FirstLevelCategory {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FirstLevelCategory.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FirstLevelCategory.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FirstLevelCategory.prototype, "alias", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], FirstLevelCategory.prototype, "secondLevelCategory", void 0);
exports.FirstLevelCategory = FirstLevelCategory;
class SecondLevelCategory {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SecondLevelCategory.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SecondLevelCategory.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SecondLevelCategory.prototype, "alias", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", FirstLevelCategory)
], SecondLevelCategory.prototype, "firstLevelCategory", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SecondLevelCategory.prototype, "firstLevelId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], SecondLevelCategory.prototype, "videos", void 0);
exports.SecondLevelCategory = SecondLevelCategory;
//# sourceMappingURL=category.entity.js.map