// backend index
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (_, res) => res.send("Backend running"));

const start = async () => {
  await connectDB(process.env.MONGO_URI!);
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 Server running on ${port}`));
};

start();
