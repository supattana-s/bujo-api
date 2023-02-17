import { Schema, model } from "mongoose";

import { UserInterface } from "../interfaces/user.interfaces";

const userSchema = new Schema<UserInterface>({
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
    },
    mobilePhone: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

const User = model<UserInterface>("User", userSchema);
export default User;
