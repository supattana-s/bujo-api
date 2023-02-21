import express, { Router } from "express";
import * as authController from "../controllers/authController";
import authenticate from "../middleware/authenticate";
const route: Router = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);
route.get("/me", authenticate, authController.getme);

export default route;
