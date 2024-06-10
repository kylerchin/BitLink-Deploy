import { MongoClient, ObjectId } from "mongodb";
import { client } from "../server";
import { Post } from "../types";

const express = require("express");
const cors = require("cors");
const asyncHandler = require("express-async-handler");

const app = express();
app.use(cors());
app.use(express.json());

exports.getPost = asyncHandler(async (req: any, res: any) => {
  try {
    const postId = req.params.id;
    const database = client.db("account");
    const collection = database.collection("post");
    const post = await collection.findOne({ _id: new ObjectId(postId) });
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch post");
  }
});

exports.getPosts = asyncHandler(async (req: any, res: any) => {
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
      date: post.date,
      likes: post.likes,
      reposts: post.reposts,
      comment_num: post.comment_num,
      saves: post.saves,
      likedby: post.likedby,
    }));

    res.json(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Failed to fetch messages");
  }
});

exports.searchPosts = asyncHandler(async (req: any, res: any) => {
  try {
    const database = client.db("account");
    const post_query = { "content.message": { $regex: req.query.q } };
    const search = await database.collection("post").find(post_query).toArray();

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
      date: post.date,
      likes: post.likes,
      reposts: post.reposts,
      comment_num: post.comment_num,
      saves: post.saves,
      likedby: post.likedby,
    }));

    res.json(data);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).send("Failed to search");
  }
});

exports.addPost = asyncHandler(async (req: any, res: any) => {
  try {
    //add a post to the database
    const database = client.db("account");
    const collection = database.collection("post");
    const newPostBody = req.body;
    const newPost = {
      title: newPostBody.title,
      content: {
        message: newPostBody.content?.message,
        image: newPostBody.content?.image,
        video: newPostBody.content?.video,
      },
      user: {
        username: newPostBody.user?.username,
        usertag: newPostBody.user?.usertag,
        profile_pic: newPostBody?.user.profile_pic,
      },
      comments: [],
      date: new Date(),
      likes: 0,
      reposts: 0,
      comment_num: 0,
      saves: 0,
      likedby: [],
    };

    await collection.insertOne(newPost);
    res.status(201).send("Post created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create post");
  }
});

exports.likePost = asyncHandler(async (req: any, res: any) => {
  try {
    const database = client.db("account");
    const collection = database.collection("post");
    const query = { _id: new ObjectId(req.params.id) };
    const post = await collection.findOne(query);
    const userId = req.body.userId;
    console.log(userId);
    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    await collection.updateOne(query, {
      $inc: { likes: 1 },
      $addToSet: { likedby: userId },
    });
    res.status(200).json({ message: "Post liked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to like post" });
  }
});

exports.unlikePost = asyncHandler(async (req: any, res: any) => {
  try {
    const database = client.db("account");
    const collection = database.collection("post");
    const query = { _id: new ObjectId(req.params.id) };
    const post = await collection.findOne(query);
    const userId = req.body.userId;
    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    await collection.updateOne(query, {
      $inc: { likes: -1 },
      $pull: { likedby: userId },
    });
    res.status(200).json({ message: "Post disliked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to dislike post" });
  }
});

exports.getUserPosts = asyncHandler(async (req: any, res: any) => {
  try {
    const usertag = req.params.usertag;
    const database = client.db("account");
    const posts = await database
      .collection("post")
      .find({ "user.usertag": usertag })
      .toArray();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch posts");
  }
});
