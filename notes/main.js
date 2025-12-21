// okay we are going to work now
// import fs from "fs";
const fs = require("fs");
const express = require("express");
const app = express();
//
// app.use("/id/:idnum", (req, res) => {
// });
async function arrdata() {
  fs.readFile("myfile.txt", "utf8", (err, data) => {
    if (err) {
      console.log(`there is an error ${err}`);
    } else {
      //   console.log(data);
      return data;
    }
  });
}
console.log(arrdata());
