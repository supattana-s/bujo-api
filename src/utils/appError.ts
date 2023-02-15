import { ErrorInterface } from "../interfaces/error.interfaces";
import { errorStatusCode } from "../types/statusCode.types";

export default class AppError extends Error implements ErrorInterface {
    constructor(inputStatusCode: errorStatusCode, errorMessage: string) {
        super(errorMessage);
        this.statusCode = inputStatusCode;
    }

    statusCode: errorStatusCode;
}
