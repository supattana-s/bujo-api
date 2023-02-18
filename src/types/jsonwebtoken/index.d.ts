export {};

// declare global {
//     module "jsonwebtoken" {
//         export interface JwtPayload {
//             id: string;
//         }
//     }
// }
declare module "jsonwebtoken" {
    export interface JwtPayload {
        id: string;
    }
}
