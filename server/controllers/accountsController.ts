const express = require("express");
const cors = require("cors")
import {ObjectId} from "mongodb";
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

const database = client.db("account").collection("user");


exports.getUsers = asyncHandler(async (res: any) => {
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



