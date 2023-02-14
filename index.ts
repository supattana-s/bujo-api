import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import { Send, Query } from "express-serve-static-core";

const app: Express = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send({
        username: "myname",
        password: 12345,
    });
});

app.listen(process.env.PORT, () =>
    console.log(`server listening on port: ${process.env.PORT}`)
);
