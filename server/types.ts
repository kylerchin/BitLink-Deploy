// D:/Classes/INF124/BitLink/server/types.ts

export interface User {
    user_id: string;
    username: string;
    usertag: string;
    profile_pic: string;
  }

export interface Message {
    sender_id: string;
    receiver_id: string;
    content: string;
    timestamp: string;
  }
