// orm and odm
// mongoose - help use to talk between the appserver and the mongodb server
import express from "express";
import { usermodel } from "./usermodel.js";
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.json({ message: "working" });
});
// everything in the mongoose is promise based so we can use async await
app.get("/create", async (req, res) => {
  let name = req.headers.name;
  let email = req.headers.email;
  let username = req.headers.username;
  const userCreated = await usermodel.create({
    name: name,
    email: email,
    username: username,
  });
  res.send(userCreated);
});
// finds user on the basis of obj passed
app.get("/read", async (req, res) => {
  const found = await usermodel.find();
  res.send(found);
});
// we eidting the existing user
app.get("/update", async (req, res) => {
  const updated = await usermodel.findOneAndUpdate(
    { name: "wow is this for real?/" }, // searching via something
    { name: "nishank gangwar" }, // changing its something
    { new: true }
  );
  res.send(updated);
});

// deleting somthing in db
app.get("/delete", async (req, res) => {
  let users = await usermodel.findOneAndDelete({ name: "nishank" });
  res.send(users);
});
app.listen(PORT);
