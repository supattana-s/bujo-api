import express, { Router } from "express";
import * as todoController from "../controllers/todoController";

const route: Router = express.Router();

route.post("/", todoController.createTodo);
route.get("/", todoController.getAllTodos);

export default route;
