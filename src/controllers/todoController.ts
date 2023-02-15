import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

export const getAllTodos = async (
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

export const createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {};
