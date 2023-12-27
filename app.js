import express from "express";
import path from "path";
import authRouter from "./auth/authRouter.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const rootDir = path.dirname(__filename);

const port = process.env.port || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alik:qwerty123@asik1.bz4xxis.mongodb.net/"
    );

    app.listen(port, () => {
      console.info(
        `The server has been successfully started on the port: ${port}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

start();
