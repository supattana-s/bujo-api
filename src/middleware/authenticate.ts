import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInterface } from "../interfaces/user.interfaces";
import User from "../schema/User";
import AppError from "../utils/appError";

// export {};

// declare module "jsonwebtoken" {
//     export interface JwtPayload {
//         id: string;
//     }
// }

const authenticate = async (
    req: Request<{}, {}, {}, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || authorization.startsWith("Bearer")) {
            throw new AppError(401, "unauthenticate");
        }

        const [_, token] = authorization.split(" ");

        const payload: JwtPayload = jwt.verify(
            token,
            process.env.PRIVATEKEY || "secretkey"
        );

        const user = await User.find({ id: payload });

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
