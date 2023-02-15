import { Request, Response, NextFunction } from "express";
import { errorStatusCode } from "../types/statusCode.types";

export default function notFound(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode: errorStatusCode = 404;

    res.status(statusCode).json({ message: "Resource not Found" });
}
