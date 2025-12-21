// okay we are going to work now
// import fs from "fs";
const fs = require("fs");
const express = require("express");
const { json } = require("stream/consumers");
const app = express();
//
app.listen("3000", () => {
  console.log("app has started at localhost:3000");
});

app.use(express.urlencoded({ extended: true }));

app.get("/id/", (req, res) => {
  const idnum = req.query.idnum;
  submithandeler(arrdata(), { idnum });
  res.send({ idnum });
});

function arrdata() {
  try {
    const data = fs.readFileSync("myfile.json", "utf-8");
    return data;
  } catch (error) {
    console.log(error);
  }
}

function submithandeler(arr, push) {
  arr = JSON.parse(arr);
  arr.push(push);
  data = JSON.stringify(arr);
  fs.writeFileSync("myfile.json", data, "utf8");
}
