import { MongoClient, ObjectId } from "mongodb";
import { client } from "../server";
import { Post } from "../types";

const express = require("express");
const cors = require("cors");
const asyncHandler = require("express-async-handler");

const app = express();
app.use(cors());
app.use(express.json());

exports.postComment = asyncHandler(async(req:any, res:any) => {
    try {
        //add a post to the database
        const postId = req.params.postId;
        const database = client.db("account");
        const collection = database.collection("comment");
        const postCollection = database.collection("post");
        const newCommentBody = req.body;
        const newComment = {
          comment: newCommentBody.comment,
          user: {
            username: newCommentBody.user?.username,
            usertag: newCommentBody.user?.usertag,
            profile_pic: newCommentBody?.user.profile_pic,
          },
          likes: 0,
          reposts: 0,
          comment_num: 0,
          saves: 0,
          likedby: [],
        };
        const commentId = await collection.insertOne(newComment);
        await postCollection.updateOne(
          { _id: new ObjectId(postId) },
          {
            $addToSet: { comments: commentId.insertedId },
            $inc: { comment_num: 1 },
          }
        );
        res.status(201).send("Comment created successfully");
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create comment");
      }
});

exports.getComments = asyncHandler(async(req:any, res:any) => {
    try {
        const commentId = req.params.id;
        const database = client.db("account");
        const collection = database.collection("comment");
        const comment = await collection.findOne({
          _id: new ObjectId(commentId),
        });
        res.status(200).json(comment);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch comment");
      }
});