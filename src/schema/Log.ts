import { Schema, model } from "mongoose";
import { LogInterface } from "../interfaces/log.interfaces";

const logSchema = new Schema<LogInterface>({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: "note",
    },
    completed: {
        type: Boolean,
        default: false,
    },
    migrated: {
        type: Boolean,
        default: false,
    },
    scheduled: {
        type: Boolean,
        default: false,
    },
});

const Log = model<LogInterface>("Log", logSchema);

export default Log;
