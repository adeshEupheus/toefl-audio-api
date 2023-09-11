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
const auth_1 = __importDefault(require("./routes/auth"));
const grade_1 = __importDefault(require("./routes/grade"));
const auth_2 = require("./middleware/auth");
app.get("/", (req, res) => {
    res.send("server is working");
});
app.use("/test", auth_2.auth, test_1.default);
app.use("/audio", auth_2.auth, audio_1.default);
app.use("/school", auth_2.auth, school_1.default);
app.use("/grade", grade_1.default);
app.use("/user", user_1.default);
app.use("/auth", auth_1.default);
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// const test = async () => {
//   await prisma.schools.create({
//     data: {
//       schoolName: "Random School",
//       state: "Himachal Pradesh",
//       city: "Solan",
//       address: "Test Address",
//       email: "adeshs@eupheus.in",
//       pin: "121123",
//       expireStart: new Date(),
//       expireAt: new Date(2023, 11, 20),
//       schoolCode: "YnI2uy",
//     },
//   });
// };
// test();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
