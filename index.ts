import dotenv from "dotenv";
dotenv.config();

import express, {
    Express,
    NextFunction,
    Request,
    Response,
    urlencoded,
} from "express";
import { Send, Query } from "express-serve-static-core";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send({
        username: "myname",
        password: 12345,
    });
});

app.listen(process.env.PORT, () =>
    console.log(`server listening on port: ${process.env.PORT}`)
);
