import express from "express";
import path from "path";
import authController from "./AuthController.js";
import { check } from "express-validator";
import { rootDir } from "../app.js";

const Router = express;
const authRouter = new Router();

authRouter
  .route("/registration")
  .get((req, res) => {
    return res.sendFile(path.join(rootDir, "public", "reg.html"));
  })
  .post(authController.registration, [
    check("username", "The username shouldn't be empty").notEmpty,
    check(
      "password",
      "The password should be from 8 to 30 characters"
    ).isLength({
      min: 8,
      max: 30,
    }),
  ]);

authRouter
  .route("/login")
  .get((req, res) => {
    return res.sendFile(path.join(rootDir, "public", "log.html"));
  })
  .post(authController.login);

export default authRouter;
