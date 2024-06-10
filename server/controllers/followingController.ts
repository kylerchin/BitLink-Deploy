import { MongoClient, ObjectId } from "mongodb";
import { client } from "../server";
import { Follow, Post } from "../types";

const express = require("express");
const cors = require("cors");
const asyncHandler = require("express-async-handler");

const app = express();
app.use(cors());
app.use(express.json());

exports.getFollowers = asyncHandler(async(req:any, res:any) => {
    try {
      const userId = req.query.user_id; // Expect a user_id query parameter
      if (!userId) {
        return res.status(400).send("User ID must be provided");
      }
      const database = client.db("account");
      const id = new ObjectId(userId);
      const collections = database.collection("user");
      const query = { _id: id };
      const followingIDlist = await collections.findOne(query);
      if (!followingIDlist) {
        res.status(404).send("User not found");
        return;
      }
      const followingIDs = followingIDlist.following.map(
        (id: string) => new ObjectId(id)
      );
      const query2 = { _id: { $in: followingIDs } };
      const followingAcc = await collections.find(query2).toArray();
      console.log(followingAcc);
      const userInfo: Follow[] = followingAcc.map((followingAcc) => ({
        _id: followingAcc._id,
        username: followingAcc.username,
        name: followingAcc.name,
        profile_pic: followingAcc.profile_picture,
      }));
      res.json(userInfo);
    } catch (error) {
      console.error("Error fetching following list:", error);
      res.status(500).send("Failed to fetch following list");
    }
  });

  exports.unfollow = asyncHandler(async(req:any, res:any) => {
    try {
      const userid = new ObjectId(req.query.id2);
      const database = client.db("account");
      const query = { _id: userid };
      const followingIDlist = await database.collection("user").findOne(query);
      if (!followingIDlist) {
        res.status(404).send('User not found');
        return;
      }
      const followingIDs = followingIDlist.following;
      const id = req.query.id;
      const index = followingIDs.indexOf(id);
      if (index > -1) {
        followingIDs.splice(index, 1);
        await database.collection("user").updateOne(query, { $set: { following: followingIDs } });
        res.status(200).send('Unfollowed successfully');
      } else {
        res.status(404).send('ID to unfollow not found in following list');
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      res.status(500).send('Failed to unfollow user');
    }
  });
  