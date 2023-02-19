import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/User";
import AppError from "../utils/appError";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer")) {
            throw new AppError(401, "unauthenticate");
        }

        const [_, token] = authorization.split(" ");

        const payload = jwt.verify(
            token,
            process.env.JWTPRIVATEKEY || "secretkey"
        );

        if (typeof payload === "string") {
            throw new AppError(500, "unauthorization");
        }

        const user = await User.findOne().where({ _id: payload.id });

        if (!user) {
            throw new AppError(401, "unauthoraized");
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

export default authenticate;
