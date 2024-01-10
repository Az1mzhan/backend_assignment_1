import path from "path";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { __dirname } from "../app.js";
import { validationResult } from "express-validator";
import { generateAccessToken } from "../jwt/generateAccessToken.js";

class AuthController {
  getRegistrationPage(req, res) {
    try {
      res
        .status(200)
        .sendFile(path.join(__dirname, "public/registration.html"));
    } catch (err) {
      console.error(err);

      res.status(400).send({
        message: "Couldn't retrieve the registration page",
      });
    }
  }

  getLoginPage(req, res) {
    try {
      res.status(200).sendFile(path.join(__dirname, "public/login.html"));
    } catch (err) {
      console.error(err);

      res.status(400).send({
        message: "Couldn't retrieve the registration page",
      });
    }
  }

  async registration(req, res) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return res.status(400).send({ message: validationErrors.array() });

      const { username, password } = req.body;
      const isRegistered = await User.findOne({ username });

      if (isRegistered) {
        return res
          .status(400)
          .send({ message: "The user with this username already exists" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashPassword });

      await user.save();

      res
        .status(200)
        .send({ message: "The user has been successfully registered" });
    } catch (err) {
      console.error(err);

      res.status(400).send({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user)
        return res.status(400).send({ message: "The user doesn't exist" });

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword)
        return res.status(400).send({ message: "Invalid password" });

      const token = generateAccessToken(user._id);

      res.status(200).send({ token });
    } catch (err) {
      console.error(err);

      res.status(400).json({ message: "Login error" });
    }
  }
}

export default new AuthController();
