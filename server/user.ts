import * as mongodb from "mongodb";

export interface User {
    username: string;
    password: string;
    email: string;
    name: string;
    profilePicture: string;
    following: [];
    _id?: mongodb.ObjectId;
}