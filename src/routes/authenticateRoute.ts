import express, { Router } from "express";
import * as authController from "../controllers/authController";
const route: Router = express.Router();

route.post("/register", authController.register);

export default route;
