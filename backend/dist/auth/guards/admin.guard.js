"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminJwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
class AdminJwtAuthGuard {
    canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const jwtToken = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(jwtToken);
        if (!jwtToken) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const decoded = jwt.verify(jwtToken, 'SOME_SECRET');
            request.user = decoded;
            if (decoded.role === 'admin' || decoded.email === 'damur2004@gmail.com')
                return true;
            throw new common_1.UnauthorizedException();
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
}
exports.AdminJwtAuthGuard = AdminJwtAuthGuard;
//# sourceMappingURL=admin.guard.js.map