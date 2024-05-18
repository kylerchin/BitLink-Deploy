import * as dotenv from "dotenv";
import express, { request, response } from "express";
import cors from "cors";
import { User, Message } from "./types";
import {MongoClient, ServerApiVersion} from 'mongodb';
const uri = "mongodb+srv://briannw2:IuH2qY69AaAKHGSs@bitlink.wfyrdwt.mongodb.net/?retryWrites=true&w=majority&appName=Bitlink";

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function connectToDatabase() {
  try {
      // Connect the client to the server
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return client;  // Return the connected client
  } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      // Handle error (e.g., retry connection, log error, etc.)
      throw error; // Optionally rethrow or handle differently
  }
}

// Connect to MongoDB and start Express server
connectToDatabase()
  .then((client) => {
    const app = express();  // Assuming express is used

    app.get('/api/account/messages', async (req, res) => {
      try {
        const database = client.db("account");
        const query = { $or: [{ sender_id: "1" }, { receiver_id: "1" }] };
        const messages = await database.collection("message").find(query).toArray();
        const userIds = new Set<string>();
        messages.forEach(message => { 
          if (message.sender_id === "1") userIds.add(message.receiver_id);
          if (message.receiver_id === "1") userIds.add(message.sender_id);
        });
        const userIdArray = Array.from(userIds);
        const query2 = { user_id: { $in: userIdArray } };
        const collections = database.collection("user");
        // Fetch user information from the user collection
        const users = await collections.find(query2).toArray();

        // Map the user documents to the required format
        const userInfo: User[] = users.map(user => ({
          username: user.username,
          usertag: user.user_tag,
          profile_pic: user.profile_picture,
          user_id: user.user_id,
        }));

        const messageInfo: Message[] = messages.map(messages => ({
          sender_id: messages.sender_id,
          receiver_id: messages.receiver_id,
          content: messages.content,
          timestamp: messages.timestamp,
        }));
        
        const data = {
          users: userInfo,
          messages: messageInfo
        };

        res.json(data);
      } catch (error) {
        console.error("Error fetching users & messages:", error);
        res.status(500).send('Failed to fetch users & messages');
      }
    });

    app.get('/api/account/following', async (req, res) => {
      try{
        const database = client.db("account");
        const collections = database.collection("user");
        const query = { user_id: "1" };
        const followingIDlist = await collections.findOne(query);
        if (!followingIDlist) {
          res.status(404).send('User not found');
          return;
        }
        const followingIDs = followingIDlist.following;

        const query2 = { user_id: { $in: followingIDs } };
        const followingAcc = await collections.find(query2).toArray();
        const userInfo: User[] = followingAcc.map(followingAcc => ({
          user_id: followingAcc.user_id,
          username: followingAcc.username,
          usertag: followingAcc.user_tag,
          profile_pic: followingAcc.profile_picture,
        }));
        res.json(userInfo);
      } catch (error) {
        console.error("Error fetching following list:", error);
        res.status(500).send('Failed to fetch following list');
      }
    });

    app.delete('/api/account/unfollow', cors(), async (req, res) => {
      try {
        const database = client.db("account");
        const query = { user_id: "1" };
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

    app.post('api/account/sendmessage', cors(), async (req, res) => {
      try{
        const senderid = req.query.id1;
        const receiverid = req.query.id2;
        const database = client.db("account");
        const collection = database.collection("message");
        const body = req.body;
        const message = body.message;
        const time = body.time

        collection.insertOne({
          sender_id:senderid,
          receiver_id:receiverid,
          content:message,
          timestamp:time
        })

      } catch (error) {
          console.error("Error sending message", error);
          res.status(500).send('Failed to send message');
      }
    })

    app.listen(4200, () => {
      console.log(`Server running at http://localhost:4200...`);
    });

    process.on('SIGINT', () => {
      client.close().then(() => {
        console.log("MongoDB connection closed due to app termination");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1); // Exit with error code on failure
  });
