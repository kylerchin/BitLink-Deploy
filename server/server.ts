// @ts-ignore
import { query, request, response, Express, Request, Response } from "express";
// @ts-ignore
// import cors from "@types/cors";
import { User, Message } from "./types";
import { Post } from "./types";
import { ProfileInfo } from "./types";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://briannw2:IuH2qY69AaAKHGSs@bitlink.wfyrdwt.mongodb.net/?retryWrites=true&w=majority&appName=Bitlink";

const accountsRouter = require("./routers/accounts");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return client; // Return the connected client
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Handle error (e.g., retry connection, log error, etc.)
    throw error; // Optionally rethrow or handle differently
  }
}

// Connect to MongoDB and start Express server
connectToDatabase()
  .then((client) => {
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set("trust proxy", true);
    const corsOptions = {
      origin: ["http://localhost:4200"],
      credentials: true,
    };
    app.use(cors(corsOptions));

    app.use(
      session({
        cookieName: "UserStuff",
        secret: "A73C1437873813D98C9D281D7F195",
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: false,
        },
        store: new MongoStore({
          client: client,
          collection: "sessions",
        }),
      })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/accounts", accountsRouter);

    app.get("/api/account/messages", async (req: any, res: any) => {
      try {
        const database = client.db("account");
        const query = { $or: [{ sender_id: "1" }, { receiver_id: "1" }] };
        const messages = await database
          .collection("message")
          .find(query)
          .toArray();
        const userIds = new Set<string>();
        messages.forEach((message) => {
          if (message.sender_id === "1") userIds.add(message.receiver_id);
          if (message.receiver_id === "1") userIds.add(message.sender_id);
        });
        const userIdArray = Array.from(userIds);
        const query2 = { user_id: { $in: userIdArray } };
        const collections = database.collection("user");
        // Fetch user information from the user collection
        const users = await collections.find(query2).toArray();

        // Map the user documents to the required format
        const userInfo: User[] = users.map((user) => ({
          username: user.username,
          usertag: user.user_tag,
          profile_pic: user.profile_picture,
          user_id: user.user_id,
        }));

        const messageInfo: Message[] = messages.map((messages) => ({
          sender_id: messages.sender_id,
          receiver_id: messages.receiver_id,
          content: messages.content,
          timestamp: messages.timestamp,
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
    app.post("/api/posts/create", async (req: Request, res: Response) => {
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
    app.put("/api/posts/:id/like", async (req: Request, res: Response) => {
      //add a like to the post with the specific id
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
    app.put("/api/posts/:id/dislike", async (req: Request, res: Response) => {
      //add a like to the post with the specific id
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

    app.put("/api/posts/:id/comment", async (req: Request, res: Response) => {
      //add a comment to the post with the specific id
    });

    app.get("/api/posts/:id", async (req: Request, res: Response) => {
      //get the post with the specific id
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
    app.get("/api/comments/:id", async (req: Request, res: Response) => {
      //get the comment with the specific id
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
    app.get("/api/posts", async (req: Request, res: Response) => {
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

    app.get("/api/user/:id", async (req: Request, res: Response) => {
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

    app.get("/api/search/", async (req: Request, res: Response) => {
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

    app.get("/api/account/following", async (req: any, res: any) => {
      try {
        const database = client.db("account");
        const collections = database.collection("user");
        const query = { user_id: "1" };
        const followingIDlist = await collections.findOne(query);
        if (!followingIDlist) {
          res.status(404).send("User not found");
          return;
        }
        const followingIDs = followingIDlist.following;

        const query2 = { user_id: { $in: followingIDs } };
        const followingAcc = await collections.find(query2).toArray();
        const userInfo: User[] = followingAcc.map((followingAcc) => ({
          user_id: followingAcc.user_id,
          username: followingAcc.username,
          usertag: followingAcc.user_tag,
          profile_pic: followingAcc.profile_picture,
        }));
        res.json(userInfo);
      } catch (error) {
        console.error("Error fetching following list:", error);
        res.status(500).send("Failed to fetch following list");
      }
    });

    app.delete("/api/account/unfollow", cors(), async (req: any, res: any) => {
      try {
        const database = client.db("account");
        const query = { user_id: "1" };
        const followingIDlist = await database
          .collection("user")
          .findOne(query);
        if (!followingIDlist) {
          res.status(404).send("User not found");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    });

    app.post("/api/account/sendmessage", cors(), async (req: any, res: any) => {
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
    });

    app.listen(8888, () => {
      console.log(`Server running at http://localhost:8888...`);
    });

    process.on("SIGINT", () => {
      client.close().then(() => {
        console.log("MongoDB connection closed due to app termination");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    client.close().then(() => {
      console.error("Failed to connect to database:", error);
      process.exit(1); // Exit with error code on failure
    });
  });
