"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TractorDao = void 0;
const tslib_1 = require("tslib");
const tractorSchema_1 = require("../models/tractorSchema");
class TractorDao {
    fetchAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield tractorSchema_1.TractorModel.find({});
        });
    }
}
exports.TractorDao = TractorDao;
//# sourceMappingURL=tractorDao.js.map