import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../interfaces/user.interfaces";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user: UserInterface = {
            username: "pondubu",
            password: "1234",
            firstName: "supattana",
            lastName: "Suesawatawnc",
        };

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

export default authenticate;
