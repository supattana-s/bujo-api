export interface UserInterface {
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
    mobilePhone?: string;
    password: string;
    confirmPassword?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
