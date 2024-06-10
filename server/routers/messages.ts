import { client } from "../server";
import { Router } from "express";

const express = require("express");
const db = require("../server")
const app = express.Router()

const messagesController = require("../controllers/messagesController");

app.get("/api/account/messages", messagesController.getAccountMessages);
app.post("/api/account/sendmessage", messagesController.sendMessage);

module.exports = app;
