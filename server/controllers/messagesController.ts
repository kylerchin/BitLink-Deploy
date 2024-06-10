import { MongoClient, ObjectId } from "mongodb";
import { client } from "../server";
import { Post } from "../types";

const express = require("express");
const cors = require("cors");
const asyncHandler = require("express-async-handler");

const app = express();
app.use(cors());
app.use(express.json());

exports.getAccountMessages = asyncHandler(async(req:any, res:any) => {
    try {
        const userId = req.query.user_id; // Expect a user_id query parameter
        if (!userId) {
          return res.status(400).send("User ID must be provided");
        }

        const database = client.db("account");

        // Modify the query to use ObjectId
        const query = { $or: [{ sender_id: userId }, { receiver_id: userId }] };
        const messages = await database
          .collection("message")
          .find(query)
          .toArray();
        const userIds = new Set<string>();

        // Update logic to use ObjectId
        messages.forEach((message) => {
          if (message.sender_id === userId)
            userIds.add(message.receiver_id.toString());
          if (message.receiver_id === userId)
            userIds.add(message.sender_id.toString());
        });

        const userIdArray = Array.from(userIds);
        const userIdsAsObjectId = userIdArray.map(
          (userId) => new ObjectId(userId)
        );
        const query2 = { _id: { $in: userIdsAsObjectId } };
        const collections = database.collection("user");
        // Fetch user information from the user collection
        const users = await collections.find(query2).toArray();

        // Ensure the mapping corresponds to the expected User interface
        const userInfo = users.map((user) => ({
          username: user.username,
          name: user.name, // Verify this is the correct property name
          profile_pic: user.profile_picture, // Verify this is the correct property name
          _id: user._id.toString(), // Ensure correct property and conversion to string
        }));

        const messageInfo = messages.map((message) => ({
          sender_id: message.sender_id.toString(), // Convert ObjectId to string
          receiver_id: message.receiver_id.toString(), // Convert ObjectId to string
          content: message.content,
          timestamp: message.timestamp,
        }));

        const data = {
          users: userInfo,
          messages: messageInfo,
        };

        res.json(data);
      } catch (error) {
        console.error("Error fetching users & messages:", error);
        res.status(500).send("Failed to fetch users & messages");
      }
});

exports.sendMessage = asyncHandler(async(req:any, res:any) => {
    try {
        const senderid = req.query.id1;
        const receiverid = req.query.id2;
        const database = client.db("account");
        const collection = database.collection("message");
        const body = req.body;
        const message = body.message;
        const time = body.time;

        await collection.insertOne({
          sender_id: senderid,
          receiver_id: receiverid,
          content: message,
          timestamp: time,
        });

        res.status(200).send("Message Sent successfully");
      } catch (error) {
        console.error("Error sending message", error);
        res.status(500).send("Failed to send message");
      }
})