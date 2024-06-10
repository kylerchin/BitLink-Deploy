import { client } from "../server";
import { Router } from "express";

const express = require("express");
const db = require("../server");
const app = express.Router();

const followingController = require("../controllers/followingController");

app.get("/api/account/following", followingController.getFollowers);

app.delete("/api/user/unfollow", followingController.unfollow);

module.exports = app;
