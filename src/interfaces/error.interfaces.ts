import { errorStatusCode } from "../types/statusCode.types";

export interface ErrorInterface extends Error {
    statusCode: errorStatusCode;
}
