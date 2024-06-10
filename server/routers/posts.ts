import { client } from "../server";
import { Router } from "express";

const express = require("express");
const db = require("../server")
const app = express.Router()

const postsController = require("../controllers/postsController");

app.get("/api/posts/:id", postsController.getPost);
app.get("/api/posts", postsController.getPosts);
app.get("/api/search", postsController.searchPosts);
app.post("/api/posts/create", postsController.addPost);
app.put("/api/posts/:id/like", postsController.likePost);
app.put("/api/posts/:id/dislike", postsController.unlikePost);

module.exports = app;
