"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
app.use((0, cors_1.default)());
// middleware
// import { auth } from "./middleware/auth";
// router
const test_1 = __importDefault(require("./routes/test"));
const audio_1 = __importDefault(require("./routes/audio"));
const user_1 = __importDefault(require("./routes/user"));
const school_1 = __importDefault(require("./routes/school"));
const auth_1 = require("./middleware/auth");
app.get("/", (req, res) => {
    res.send("server is working");
});
app.use("/test", auth_1.auth, test_1.default);
app.use("/audio", auth_1.auth, audio_1.default);
app.use("/school", auth_1.auth, school_1.default);
app.use("/auth", user_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
