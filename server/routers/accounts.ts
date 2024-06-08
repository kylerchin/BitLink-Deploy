import {client} from "../server";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const express = require('express');
const app = express.Router();

const accountController = require("../controllers/accountsController");

app.get("/getAllUsers", accountController.getUsers);

app.post("/register", accountController.register);

app.post('/login',
  passport.authenticate('local', {
    session: true
  })
)

passport.serializeUser((user:any, done:any) => {
  return done(null, user.email)
});

passport.deserializeUser(async (id:any, done:any) => {
  const database = client.db("account").collection("user");

  console.log("deserialize")
  database.findOne({email:id}).then((user:any) => {
    console.log(user)
    return done(null, user);
  })
})

passport.use("local", new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function verify(email:any, password:any, cb:any) {
  const database = client.db("account").collection("user");

  console.log("Verifying...")
  try {
    database.findOne({email:email}).then(user => {
      if (!user) {
        console.log("User not found")
        return cb(null, false, { message: 'Incorrect username or password.' })
      }

      bcrypt.compare(password, user.password, function(err:any, result:any) {
        if (err) {
          console.log("Failed password check")
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        if (!result) return cb(null, false, {message: "Incorrect username or password."});
        else {
          console.log("Success Login")
          return cb(null, user);
        }
      })
    });
  } catch (e) {
    console.error(e);
    return cb(null, false, {message: "Error"});
  }
}))

app.get("/user", accountController.currentUser);

app.put("/:id", accountController.updateUser);

app.get("/:id", accountController.getUser);

module.exports = app;