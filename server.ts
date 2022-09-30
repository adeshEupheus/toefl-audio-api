import express, { Express } from "express";
const app: Express = express();
app.use(express.json());
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
app.use(cors());

// middleware
import { auth } from "./middleware/auth";

// router
import testRouter from "./routes/test";
import audioRouter from "./routes/audio";

app.get("/", (req, res) => {
  res.send("server is working");
});
app.use("/test", testRouter);
app.use("/audio", audioRouter);

const PORT = process.env.PORT || 5060;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
