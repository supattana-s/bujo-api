import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

export default async function serverConnection(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(
            `${process.env.MONGODBURL}/${process.env.DATABASE}`
        );

        console.log(`MongoDB server connected: ${process.env.DATABASE}`);
        next();
    } catch (err) {
        next(err);
    }
}
