import { UserInterface } from "../../interfaces/user.interfaces";
export {};

declare global {
    namespace Express {
        export interface Request {
            user: UserInterface;
        }
    }
}
