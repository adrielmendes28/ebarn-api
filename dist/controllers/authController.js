"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthController = class AuthController {
    authUser(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            const jwtConfig = {
                hash: '9eb71ab7420eb452a22787ca4fab501b',
                options: {
                    expiresIn: 1800,
                },
            };
            try {
                if (login === 'admin' && password === 'admin') {
                    const admToken = jsonwebtoken_1.sign({ id: 'admin' }, jwtConfig.hash, jwtConfig.options);
                    return res.status(http_status_codes_1.OK).json({ jwt: admToken });
                }
                else {
                    return res.status(http_status_codes_1.UNAUTHORIZED).json({
                        error: `Authentication Error`,
                    });
                }
            }
            catch (err) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }
};
tslib_1.__decorate([
    core_1.Post(''),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "authUser", null);
AuthController = tslib_1.__decorate([
    core_1.Controller('api/auth')
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map