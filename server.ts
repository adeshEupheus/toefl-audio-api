import express, { Express } from "express";
const app: Express = express();
app.use(express.json());
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
app.use(cors());

// middleware
// import { auth } from "./middleware/auth";

// router
import testRouter from "./routes/test";
import audioRouter from "./routes/audio";
import userRouter from "./routes/user";
import schoolRouter from "./routes/school";
import authRouter from "./routes/auth";
import gradeRouter from "./routes/grade";
import { auth } from "./middleware/auth";

app.get("/", (req, res) => {
  res.send("server is working");
});
app.use("/test", auth, testRouter);
app.use("/audio", auth, audioRouter);
app.use("/school", auth, schoolRouter);
app.use("/grade", gradeRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

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
