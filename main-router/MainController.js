import path from "path";
import { __dirname } from "../app.js";
import jwt from "jsonwebtoken";
import cfg from "../config.js";

class MainController {
  getMainPage(req, res) {
    try {
      res.status(200).sendFile(path.join(__dirname, "public/main.html"));
    } catch (err) {
      console.error(err);

      res.status(400).send({
        message: "Couldn't retrieve the main page",
      });
    }
  }

  checkAuth(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token)
        return res.status(403).send({ message: "User is not authorized" });

      const isAuth = jwt.verify(token, cfg.secret);

      if (isAuth) res.status(200).send({ message: "User is authenticated" });
    } catch (err) {
      console.error(err);

      res.status(403).send({ message: "User is not authorized" });
    }
  }
}

export default new MainController();
