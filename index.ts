import express, { Express, NextFunction, Request, Response } from "express";
const port = 8000;

const app: Express = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello from Express + TS!!!!!");
});

app.listen(port, () => console.log(`server listening on port: ${port}`));
