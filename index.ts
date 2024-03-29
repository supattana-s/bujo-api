import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import logRoute from "./src/routes/logRoute";
import error from "./src/middleware/error";
import notFound from "./src/middleware/notFound";
import mongooseServerConnect from "./src/config/mongooseServerConnecting";
import authRoute from "./src/routes/authRoute";
import authenticate from "./src/middleware/authenticate";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mongooseServerConnect);

app.use("/auth", authRoute);
app.use("/logs", authenticate, logRoute);

app.use(notFound);
app.use(error);
app.listen(process.env.PORT, () =>
    console.log(`server listening on port: ${process.env.PORT}`)
);
