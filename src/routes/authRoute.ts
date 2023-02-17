import express, { Router } from "express";
import * as authController from "../controllers/authController";
import authenticate from "../middleware/authenticate";
const route: Router = express.Router();

route.post("/register", authController.register);

export default route;
