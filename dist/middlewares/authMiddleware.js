"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const http_status_codes_1 = require("http-status-codes");
const auth = (req, res, next) => {
    var md5 = require('md5');
    const authToken = req.headers.authorization;
    const jwtConfig = {
        hash: md5('ebarn-pass'),
        options: {
            expiresIn: 2000,
        },
    };
    if (!authToken) {
        return res.status(http_status_codes_1.UNAUTHORIZED).json({
            error: 'Acess denied.',
        });
    }
    if (authToken) {
        jsonwebtoken_1.verify(authToken, jwtConfig.hash, (err) => {
            if (err) {
                return res.status(http_status_codes_1.UNAUTHORIZED).json({
                    error: 'Ac!',
                });
            }
        });
        return next();
    }
};
exports.default = auth;
//# sourceMappingURL=authMiddleware.js.map