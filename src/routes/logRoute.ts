import express, { Router } from "express";
import * as logController from "../controllers/logController";

const route: Router = express.Router();

route.post("/", logController.createLog);
route.get("/", logController.getAllLogs);

export default route;
