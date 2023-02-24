import { Request, Response, NextFunction } from "express";
import { LogInterface } from "../interfaces/log.interfaces";
import Log from "../schema/Log";
import AppError from "../utils/appError";

export const getAllLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user;

        const logs = await Log.find({ user_id: id });

        if (!logs) {
            res.status(200).json({ message: "please create some logs" });
        }
        res.status(200).json(logs);
    } catch (err) {
        next(err);
    }
};

export const createLog = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, type, migrated, completed, scheduled }: LogInterface =
            req.body;

        if (!title) {
            throw new AppError(400, "title is required");
        }

        await Log.create({
            title,
            type,
            user_id: req.user.id,
            migrated,
            completed,
            scheduled,
        });

        res.status(200).json({ message: "log created" });
    } catch (err) {
        next(err);
    }
};
