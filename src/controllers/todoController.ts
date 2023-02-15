import { Request, Response, NextFunction } from "express";

export const getAllTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.json({ message: "hi" });
};

export const createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {};
