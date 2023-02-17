import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/User";
import { UserInterface } from "../interfaces/user.interfaces";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        username,
        password,
        confirmPassword,
        email,
        mobilePhone,
        firstName,
        lastName,
    } = req.user;

    if (!email && !mobilePhone) {
        throw new AppError(400, "Email or mobilePhone is required");
    }

    if (!username) {
        throw new AppError(400, "username is required");
    }

    if (password !== confirmPassword) {
        throw new AppError(400, "Password & confirm password is not match");
    }

    if (email) {
        const isEmail = validator.isEmail(email);
        if (!isEmail) {
            throw new AppError(400, "Invalid email or mobile phone");
        }
    }
    if (mobilePhone) {
        const isMobilePhone = validator.isMobilePhone(mobilePhone);
        if (!isMobilePhone) {
            throw new AppError(400, "Invalid email or mobile phone");
        }
    }

    const hashedPassword = await bcrypt.hash(password, process.env.SALT || 12);

    const user: UserInterface = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email: email ? email : "",
        mobilePhone: mobilePhone ? email : "",
    });

    res.status(200).json({ user });
};
