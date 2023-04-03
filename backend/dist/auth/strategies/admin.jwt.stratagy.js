"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminJwtStratagy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class AdminJwtStratagy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
}
exports.AdminJwtStratagy = AdminJwtStratagy;
//# sourceMappingURL=admin.jwt.stratagy.js.map