import { Request, Response, NextFunction } from "express";
import { LogInterface } from "../interfaces/log.interfaces";
import { ParamsInterface } from "../interfaces/params.interfaces";
import Log from "../schema/Log";
import { updatedLogReqBody } from "../types/updatedLogReqBody.types";
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

export const updateLog = async (
    req: Request<ParamsInterface, {}, updatedLogReqBody, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { logId } = req.params;
        const { title, type, migrated, completed, scheduled } = req.body;

        if (migrated && scheduled) {
            throw new AppError(500, "The log can move to only one place.");
        }

        if (completed && (migrated || scheduled)) {
            throw new AppError(
                500,
                "Not make any sense to move the completed log."
            );
        }

        const updatePayload: updatedLogReqBody = {
            title,
            type,
            migrated,
            completed,
            scheduled,
        };

        const updatingLog = await Log.findOneAndUpdate(
            { _id: logId },
            updatePayload,
            { new: true }
        );

        if (!updatingLog) {
            throw new AppError(404, "Log not found");
        }

        res.status(200).json({ updatingLog });
    } catch (err) {
        next(err);
    }
};
