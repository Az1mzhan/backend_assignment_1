import express from "express";
import path from "path";
import mainRouter from "./main-router/mainRouter.js";
import authRouter from "./auth/authRouter.js";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const port = process.env.port || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/auth", express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alik:qwerty123@asik1.bz4xxis.mongodb.net/?retryWrites=true&w=majority"
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

await start();
