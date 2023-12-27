import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import { generateAccessToken } from "../jwt/generateAccessToken.js";

class AuthController {
  async registration(res, req) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res
          .status(400)
          .json({ msg: "The username or (and) the password are invalid" });
      }

      const { username, password } = req.body;
      const isRegistered = User.findOne({ username });

      if (isRegistered) {
        return res
          .status(400)
          .json({ msg: "The user with this username already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashedPassword });

      await user.save();

      return res
        .status(200)
        .json({ msg: "The user has been successfully registered" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Registration error" });
    }
  }

  async login(res, req) {
    try {
      const { username, password } = req.body();
      const user = await User.findOne({ username });

      if (!user) return res.status(400).json({ msg: "The user doesn't exist" });

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword)
        return res.status(400).json({ msg: "Invalid password" });

      const token = generateAccessToken(user._id);

      return res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Login error" });
    }
  }
}

export default new AuthController();
