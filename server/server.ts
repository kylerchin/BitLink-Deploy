// @ts-ignore
import { query, request, response, Express, Request, Response } from "express";
// @ts-ignore
// import cors from "@types/cors";
import { User, Message, Follow } from "./types";
import { Post } from "./types";
import { ProfileInfo } from "./types";
import { MongoClient, ServerApiVersion } from "mongodb";

const postsRouter = require("./routers/posts");
const messagesRouter = require("./routers/messages");
const commentsRouter = require("./routers/comments");
const followingRouter = require("./routers/following");

const uri =
  "mongodb+srv://briannw2:IuH2qY69AaAKHGSs@bitlink.wfyrdwt.mongodb.net/?retryWrites=true&w=majority&appName=Bitlink";

const accountsRouter = require("./routers/accounts");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const { ObjectId } = require("mongodb");

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
    app.use(postsRouter);
    app.use(messagesRouter);
    app.use(commentsRouter);
    app.use(followingRouter);
    // app.get("/api/userposts/:usertag", async (req: Request, res: Response) => {
    //   try {
    //     const usertag = req.params.usertag;
    //     const database = client.db("account");
    //     const posts = await database
    //       .collection("post")
    //       .find({ "user.usertag": usertag })
    //       .toArray();
    //     res.status(200).json(posts);
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).send("Failed to fetch posts");
    //   }
    // });
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
