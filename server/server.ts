import * as dotenv from "dotenv";
// @ts-ignore
import express, { Request, Response } from "express";
// @ts-ignore
import cors from "cors";
import { addPostToDatabase, connectToDatabase } from "./database";
import { Post } from "./post";
import * as path from "path";
connectToDatabase()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(
      express.static(path.join(__dirname, "../bitlink-app/dist/my-app/browser"))
    );

    // app.get("/", (req: Request, res: Response) => {
    //   res.send("Hello, world!");
    // });
    app.post("/posts", async (req: Request, res: Response) => {
      const post: Post = req.body;
      try {
        await addPostToDatabase(post);
        res.status(201).send(post);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    app.get("/*", (req: Request, res: Response) => {
      res.sendFile(
        path.join(__dirname, "../bitlink-app/dist/my-app/browser/index.html")
      );
    });
    // start the Express server
    app.listen(4200, () => {
      console.log(`Server running at http://localhost:4200...`);
    });
  })
  .catch((error) => console.error(error));
