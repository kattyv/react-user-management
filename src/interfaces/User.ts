export interface Person {
    name:       string;
    surname:    string;
    email:      string;
    phone?:     string | undefined;
    imgURL?:    string | undefined;
}

export type UserRole = "Admin" | "User" | string; //TODO: Remove 'string' type

export interface User1 extends Person {
    id:             number;
    username:       string;
    password:       string;
    role:           UserRole;
    isActive:       boolean;
    permissions:    Array<number>;
}

export interface User {
    id:         number,
    name:       string,
    surname:    string,
    email:      string,
    phone?:     string,
    imgURL?:    string,
    username:       string,
    password:   string,
    role:           UserRole,
    isActive:       boolean,
    permissions:    number[]
}
