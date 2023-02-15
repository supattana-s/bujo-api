import { Request, Response, NextFunction } from "express";
import { ErrorInterface } from "../interfaces/error.interfaces";
import { errorStatusCode } from "../types/statusCode.types";

export default function error(
    err: ErrorInterface,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errorStatusCode: errorStatusCode = err.statusCode || 500;

    console.log(err);
    res.status(errorStatusCode).json({ message: err.message });
}
