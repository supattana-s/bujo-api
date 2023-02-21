import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/User";
import { UserInterface } from "../interfaces/user.interfaces";

type payloadTypes = {
    id: string;
};

const genToken = (payload: payloadTypes) => {
    return jwt.sign(payload, process.env.JWTPRIVATEKEY || "privateKey", {
        expiresIn: process.env.EXPIREDIN || "7d",
    });
};

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
    } = req.body;

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

    const hashedPassword = await bcrypt.hash(password, 12);

    const user: UserInterface = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email: email ? email : "",
        mobilePhone: mobilePhone ? email : "",
    });

    if (!user.id) {
        throw new AppError(500, "something went wrong");
    }

    const token: string = genToken({ id: user.id });

    res.status(200).json({ token });
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password, mobilePhone, email } = req.body;

        if (!username && !mobilePhone && !email) {
            throw new AppError(
                400,
                "username or mobilePhone or email or password is required"
            );
        }

        const user = await User.findOne({
            $or: [{ username }, { mobilePhone }, { email }],
        });

        if (!user) {
            throw new AppError(
                400,
                "username or mobilePhone or email password is invalid"
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new AppError(
                400,
                "username or mobilePhone or email or password is invalid"
            );
        }

        const token = genToken({ id: user.id });

        res.status(200).json(token);
    } catch (err) {
        next(err);
    }
};

export const getme = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(200).json({ user: req.user });
};
