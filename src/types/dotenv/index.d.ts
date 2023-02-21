declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            MONGODBURL: string;
            DATABASE: string;
            JWTPRIVATEKEY: string;
            EXPIREDIN: string;
        }
    }
}

export {};
