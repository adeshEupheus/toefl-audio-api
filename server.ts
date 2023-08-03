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
import authRouter from "./routes/user";
import schoolRouter from "./routes/school";
import { auth } from "./middleware/auth";

app.get("/", (req, res) => {
  res.send("server is working");
});
app.use("/test", auth, testRouter);
app.use("/audio", auth, audioRouter);
app.use("/school", auth, schoolRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
