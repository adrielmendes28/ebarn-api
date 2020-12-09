"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TractorController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const tractorDao_1 = require("../daos/tractorDao");
const authMiddleware_1 = tslib_1.__importDefault(require("../middlewares/authMiddleware"));
let TractorController = class TractorController {
    constructor() {
        this.tractorDao = new tractorDao_1.TractorDao();
    }
    fetchAllTractorList(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.tractorDao.fetchAll();
                return res.status(http_status_codes_1.OK).json(users);
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
    core_1.Get('all'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TractorController.prototype, "fetchAllTractorList", null);
TractorController = tslib_1.__decorate([
    core_1.Controller('tractor'),
    core_1.ClassMiddleware(authMiddleware_1.default)
], TractorController);
exports.TractorController = TractorController;
//# sourceMappingURL=tractorController.js.map