import { client } from "../server";
import { Router } from "express";

const express = require("express");
const db = require("../server")
const app = express.Router()

const commentsController = require("../controllers/commentsController");

app.post("/api/posts/:postId/comment", commentsController.postComment);

module.exports = app;
