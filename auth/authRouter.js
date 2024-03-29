import authController from "./AuthController.js";
import { Router } from "express";
import { check } from "express-validator";

const authRouter = new Router();

authRouter
  .route("/registration")
  .get(authController.getRegistrationPage)
  .post(
    [
      check("username", "The username shouldn't be empty").notEmpty(),
      check(
        "username",
        "The username shouldn't contain cyrillic characters"
      ).matches(/[^\u0400-\u04FF]/g),
      check(
        "username",
        "The username should contain at least 1 uppercase letter and 1 lowercase letter"
      ).matches(/^(?=.*[A-Za-z]).*$/),
      check(
        "password",
        "The password's length should vary from 8 to 30 characters"
      ).isLength({
        min: 8,
        max: 30,
      }),
      check(
        "password",
        "The password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?]).*$/),
    ],
    authController.registration
  );

authRouter
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.login);

export default authRouter;
