import { Router } from "express";
import mainController from "./MainController.js";

const mainRouter = new Router();

mainRouter
  .route("/main")
  .get(mainController.getMainPage)
  .post(mainController.checkAuth);

export default mainRouter;
