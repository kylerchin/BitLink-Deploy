const express = require("express");
const cors = require("cors")
import {ObjectId} from "mongodb";
import { ProfileInfo, Post, Follow } from "../types";
const asyncHandler = require("express-async-handler");

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json())

const bcrypt = require('bcrypt');
import {client} from "../server";
const saltRounds = 10;



exports.getUsers = asyncHandler(async (res: any) => {
  const database = client.db("account").collection("user");

  try {
    const allUsers = await database.find({}).toArray();
    res.send(allUsers)
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : "Unknown error");
  }
});

exports.register = asyncHandler(async (req: any, res: any) => {
  try {
    console.log(req.body.username)
    const database = client.db("account").collection("user");


    if (await database.findOne({username:req.body.username})) {
      console.log("User already exists");
      return res.status(500).send("User already exists");
    }
    const user = req.body;
    bcrypt.hash(user.password, saltRounds, async function (err :any, hash:any) {
      if (err) {
        console.log(err);
      }
      user.password = hash;
      const result = await database.insertOne(user);

      if (result?.acknowledged) {
        console.log("Success")
      }
      else {
        console.log("Error")
        res.status(500).send("User account creation failed.")
      }
    })
  } catch (e) {
    console.error(e);
    res.status(400).send(e instanceof Error ? e.message : "Unknown error");
  }
});

exports.updateUser = asyncHandler(async (req: any, res: any) => {
  const database = client.db("account").collection("user");

  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update cannot be empty!"
      });
    }

    const id = req.params.id;
    const getID = { _id: new ObjectId(id) };
    const result = await database.updateOne(getID, { $set: req.body });

    if (result?.acknowledged) console.log(`${id} updated successfully.`);
    else if (!result?.matchedCount) res.status(404).send("User not found.");
    else res.status(500).send(`${id} unable to be updated.`);
  } catch (e) {
    console.error(e);
    res.status(400).send(e instanceof Error ? e.message : "Unknown error");
  }
})

exports.getUser = asyncHandler(async (req: any, res: any) => {
  const database = client.db("account").collection("user");

  try {
    const id = new ObjectId(req.params.id);
    const getID = { _id: id };

    let result = await database.findOne(getID);

    if (!result) res.status(404).send("User not found.");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send(e instanceof Error ? e.message : "Unknown error");
  }
});

exports.currentUser = asyncHandler(async (req:any, res:any) => {
  try {
    if (!req.user) {
      return res.status(401).send("You are not logged in.")
    }
    return res.status(200).send(req.user);

  } catch (e) {
    console.error(e);
  }
});

exports.getUserInfo = asyncHandler(async(req:any, res:any) => {
  try {
    const database = client.db("account");
    const user_query = { user_tag: req.params.id };
    const user_post_query = { "user.usertag": req.params.id };
    const user_info = await database
      .collection("user")
      .find(user_query)
      .toArray();
    const user_posts = await database
      .collection("post")
      .find(user_post_query)
      .toArray();

    const userInfo: ProfileInfo[] = user_info.map((user) => ({
      user_id: user.user_id,
      username: user.username,
      usertag: user.user_tag,
      email: user.email,
      password: user.password,
      profile_picture: user.profile_picture,
      bio: user.bio,
      following: user.following,
    }));

    // Map the post documents to the required format
    const posts: Post[] = user_posts.map((post) => ({
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

    const data = {
      user_info: userInfo,
      user_posts: posts,
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Failed to fetch user");
  }
});

