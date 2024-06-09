// D:/Classes/INF124/BitLink/server/types.ts

import { ObjectId } from "mongodb";

export interface User {
    user_id: string;
    username: string;
    usertag: string;
    profile_pic: string;
  }

export interface Follow {
    _id: ObjectId,
    username: string,
    name: string,
    profile_pic: string,
}

export interface Message {
    sender_id: string;
    receiver_id: string;
    content: string;
    timestamp: string;
  }
export interface ProfileInfo {
    user_id: string;
    username: string;
    usertag: string;
    email: string;
    password: string;
    profile_picture: string;
    bio: string;
    following: string[];
}

export interface Post {
    title: string;
    content: {
        message: string;
        image: string;
        video: string;
    }
    user: {
        username: string;
        usertag: string;
        profile_pic: string
    }
    comments: string[];
    timestamp: string;
    likes: number;
    reposts: number;
    comment_num: number;
    saves: number;
}
