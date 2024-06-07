import { MongoClient, ObjectId } from "mongodb";
import { client } from "../server";
import { Post } from "../types";

const express = require("express");
const cors = require("cors");
const asyncHandler = require("express-async-handler");

const app = express();
app.use(cors());
app.use(express.json());

exports.getPosts = asyncHandler(async(req:any, res:any) => {
    try {
        const database = client.db("account");
        const posts = await database.collection("post").find().toArray();

        // Map the post documents to the required format
        const data: Post[] = posts.map((post) => ({
          title: post.title,
          content: {
            message: post.content.message,
            image: post.content.image,
            video: post.content.video,
          },
          user: {
            username: post.user.username,
            usertag: post.user.usertag,
            profile_pic: post.user.profile_pic,
          },
          comments: post.comments,
          timestamp: post.timestamp,
          likes: post.likes,
          reposts: post.reposts,
          comment_num: post.comment_num,
          saves: post.saves,
        }));

        res.json(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Failed to fetch messages");
      }
});

exports.searchPosts = asyncHandler(async(req:any, res:any) => {
    try {
        const database = client.db("account");
        const post_query = { "content.message": { $regex: req.query.q } };
        const search = await database
        .collection("post")
        .find(post_query)
        .toArray();

        // Map the user documents to the required format
        const data: Post[] = search.map((post) => ({
        title: post.title,
        content: {
            message: post.content.message,
            image: post.content.image,
            video: post.content.video,
        },
        user: {
            username: post.user.username,
            usertag: post.user.usertag,
            profile_pic: post.user.profile_pic,
        },
        comments: post.comments,
        timestamp: post.timestamp,
        likes: post.likes,
        reposts: post.reposts,
        comment_num: post.comment_num,
        saves: post.saves,
        }));

        res.json(data);
    } catch (error) {
        console.error("Error searching:", error);
        res.status(500).send("Failed to search");
    }
});