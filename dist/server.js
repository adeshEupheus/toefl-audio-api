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
// router
const test_1 = __importDefault(require("./routes/test"));
const audio_1 = __importDefault(require("./routes/audio"));
app.get("/", (req, res) => {
    res.send("server is working");
});
app.use("/test", test_1.default);
app.use("/audio", audio_1.default);
const PORT = process.env.PORT || 5060;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} `);
});
