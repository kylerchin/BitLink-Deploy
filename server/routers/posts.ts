import { client } from "../server";
import { Router } from "express";

const express = require("express");
const db = require("../server")
const app = express.Router()

const postsController = require("../controllers/postsController");

app.get("/api/posts", postsController.getPosts);

app.get("/api/search", postsController.searchPosts);

module.exports = app;
