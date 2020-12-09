"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TractorModel = void 0;
const mongoose_1 = require("mongoose");
const TractorSchema = new mongoose_1.Schema({
    manufacturer: {
        type: String,
        required: true,
    },
    modelName: {
        type: String,
        required: true,
    },
    power: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
});
exports.TractorModel = mongoose_1.model('Tractor', TractorSchema);
//# sourceMappingURL=tractorSchema.js.map