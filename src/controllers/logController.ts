import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

export const getAllLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json({ message: "hi" });
    } catch (err) {
        next(err);
    }
};

export const createLog = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {};
