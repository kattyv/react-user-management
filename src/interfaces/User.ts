export interface Person {
    name:       string;
    surname:    string;
    email:      string;
    phone?:     string | null;
    imgURL?:    string | null;
}

export type UserRole = "Administrator" | "User";
/*
export enum UserRoleEnum {
    user = "User",
    admin = "Administrator"
}
*/

export interface User extends Person {
    id:             number;
    username:       string;
    password:       string;
    role:           UserRole;
    isActive:       boolean;
    permissions:    {
        id: number,
        isOn: boolean
    }[];
}

