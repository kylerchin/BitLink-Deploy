import * as dotenv from "dotenv";
// @ts-ignore
import * as express from "express";
// @ts-ignore
import * as cors from "cors";
import { connectToDatabase } from "./database";

connectToDatabase()
  .then(() => {
    const app = express();
    app.use(cors());

    // start the Express server
    app.listen(4200, () => {
      console.log(`Server running at http://localhost:4200...`);
    });
  })
  .catch((error) => console.error(error));
