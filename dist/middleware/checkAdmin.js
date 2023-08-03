"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const checkAdmin = (req, res, next) => {
    try {
        if (req === null || req === void 0 ? void 0 : req.admin) {
            next();
        }
        else {
            res.status(403).json({ success: false, message: "require admin role" });
        }
        // next();
    }
    catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
};
exports.checkAdmin = checkAdmin;
