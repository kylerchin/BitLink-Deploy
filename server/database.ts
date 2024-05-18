import { MongoClient, ServerApiVersion } from "mongodb";
import { Post } from "./post";
const uri =
  "mongodb+srv://briannw2:IuH2qY69AaAKHGSs@bitlink.wfyrdwt.mongodb.net/?retryWrites=true&w=majority&appName=Bitlink";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
export async function addPostToDatabase(post: Post) {
  try {
    await client.connect();
    const db = client.db("account");
    const collection = db.collection("post");
    await collection.insertOne(post);
    console.log("Post added successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
