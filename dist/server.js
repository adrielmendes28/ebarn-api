"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const core_1 = require("@overnightjs/core");
const tractorController_1 = require("./controllers/tractorController");
const authController_1 = require("./controllers/authController");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class ChallengeServer extends core_1.Server {
    constructor() {
        super(true);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.setupControllers();
        this.setupDatabase();
    }
    setupControllers() {
        const tractorController = new tractorController_1.TractorController();
        const authController = new authController_1.AuthController();
        super.addControllers([tractorController, authController]);
    }
    setupDatabase() {
        const connString = 'mongodb+srv://eadmin:eadmin@cluster0.xlcjd.mongodb.net/Cluster0?retryWrites=true&w=majority';
        mongoose_1.default.connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    start(port) {
        this.app.listen(port);
    }
}
exports.default = ChallengeServer;
('');
//# sourceMappingURL=server.js.map