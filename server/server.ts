// @ts-ignore
import express, { query, request, response } from "express";
// @ts-ignore
import cors from "cors";
import { User, Message } from "./types";
import { Post } from "./types";
import { ProfileInfo } from "./types";
import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb';
import { title } from "process";
const uri = "mongodb+srv://briannw2:IuH2qY69AaAKHGSs@bitlink.wfyrdwt.mongodb.net/?retryWrites=true&w=majority&appName=Bitlink";

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
    app.use(cors())
    app.use(express.json())

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

    app.get('/api/posts', async (req, res) => {
      try {
        const database = client.db("account");
        const posts = await database.collection("post").find().toArray();

        // Map the post documents to the required format
        const data: Post[] = posts.map(post => ({
          title: post.title,
          content: {
            message: post.content.message,
            image: post.content.image,
            video: post.content.video
          },
          user: {
            username: post.user.username,
            usertag: post.user.usertag,
            profile_pic: post.user.profile_pic
          },
          comments: post.comments,
          timestamp: post.timestamp,
          likes: post.likes,
          reposts: post.reposts,
          comment_num: post.comment_num,
          saves: post.saves
        }));

        res.json(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send('Failed to fetch messages');
      }
    });

    app.get('/api/user/:id', async (req, res) => {
      try {
        const database = client.db("account");
        const user_query = {'user_tag': req.params.id};
        const user_post_query = {'user.usertag': req.params.id};
        const user_info = await database.collection("user").find(user_query).toArray();
        const user_posts = await database.collection("post").find(user_post_query).toArray();

        const userInfo: ProfileInfo[] = user_info.map(user => ({
          user_id: user.user_id,
          username: user.username,
          usertag: user.user_tag,
          email: user.email,
          password: user.password,
          profile_picture: user.profile_picture,
          bio: user.bio,
          following: user.following
        }));

        // Map the post documents to the required format
        const posts: Post[] = user_posts.map(post => ({
          title: post.title,
          content: {
            message: post.content.message,
            image: post.content.image,
            video: post.content.video
          },
          user: {
            username: post.user.username,
            usertag: post.user.usertag,
            profile_pic: post.user.profile_pic
          },
          comments: post.comments,
          timestamp: post.timestamp,
          likes: post.likes,
          reposts: post.reposts,
          comment_num: post.comment_num,
          saves: post.saves
        }));

        const data = {
          user_info: userInfo,
          user_posts: posts
        }

        res.json(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send('Failed to fetch user');
      }
    });

    app.get('/api/search/', async (req, res) => {
      try {
        const database = client.db("account");
        const post_query = {'content.message': {$regex: req.query.q}}
        const search = await database.collection("post").find(post_query).toArray();

        // Map the user documents to the required format
        const data: Post[] = search.map(post => ({
          title: post.title,
          content: {
            message: post.content.message,
            image: post.content.image,
            video: post.content.video
          },
          user: {
            username: post.user.username,
            usertag: post.user.usertag,
            profile_pic: post.user.profile_pic
          },
          comments: post.comments,
          timestamp: post.timestamp,
          likes: post.likes,
          reposts: post.reposts,
          comment_num: post.comment_num,
          saves: post.saves
        }));

        res.json(data);
      } catch (error) {
        console.error("Error searching:", error);
        res.status(500).send('Failed to search');
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

    app.post('/api/account/sendmessage', cors(), async (req, res) => {
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
    });

    app.get("/api/account/getAllUsers", async (_req, res) => {
      try {
        const db = client.db("account")
        const allUsers = await db.collection("users").find({}).toArray();
        res.status(200).send(allUsers);
      } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
      }
    });

    app.post("/api/account/register", async (req, res) => {
      try {
        const database = client.db("account")
        console.log(req.body.username)

        if (await database.collection("users").findOne({username:req.body.username})) {
          console.log("User already exists");
          return res.status(500).send("User already exists");
        }
        const user = req.body;
        const result = await database.collection("users").insertOne(user);

        if (result?.acknowledged) {
          console.log("Success")
        }
        else {
          console.log("Error")
          res.status(500).send("User account creation failed.")
        }
      } catch (e) {
        console.error(e);
        res.status(400).send(e instanceof Error ? e.message : "Unknown error");
      }
    });

    app.put("/api/account/:id", async (req, res) => {
      try {
        if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
        const database = client.db("account")

        const id = req?.params?.id;
        const getID = { _id: new ObjectId(id) };
        const result = await database.collection("users").updateOne(getID, { $set: req.body });

        if (result?.acknowledged) console.log(`${id} updated successfully.`);
        else if (!result?.matchedCount) res.status(404).send("User not found.");
        else res.status(500).send(`${id} unable to be updated.`);
      } catch (e) {
        console.error(e);
        res.status(400).send(e instanceof Error ? e.message : "Unknown error");
      }
    })

    app.listen(8888, () => {
      console.log(`Server running at http://localhost:8888...`);
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
