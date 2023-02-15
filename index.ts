import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import { Send, Query } from "express-serve-static-core";
import cors from "cors";
import todoRoute from "./src/routes/todoRoute";
import error from "./src/middleware/error";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todos", todoRoute);

app.use(error);
app.listen(process.env.PORT, () =>
    console.log(`server listening on port: ${process.env.PORT}`)
);
