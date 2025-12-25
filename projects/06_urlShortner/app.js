import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { UserModel } from "../05_dbmore/userModel.js";
const __filename = fileURLToPath(import.meta.url);
import fs from "fs";
const __dirname = path.dirname(__filename);
const app = express();
import path from "path";
import { log } from "console";
import { url } from "inspector";
// let rawData = fs.readFileSync("./another.json", "utf-8");
// let data = JSON.parse(rawData) ?? [];
//
import { URLmodel } from "./URLmodel.js";
const rawdata = async () => {
  return await URLmodel.find();
};
const data = await rawdata();
console.log(data);
const PORT = 4001;

// Load the JSON data

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
let host = `http://localhost:${PORT}`;
app.get("/", (req, res) => {
  res.render("index", { data, host });
});

// random string generator
let randomString = (num) => {
  const strings = "qwertyuiopasdfghjklzxcvbnm0987654321";
  let generated = "";
  for (let i = 0; i <= num; i++) {
    let random = Math.floor(Math.random() * strings.length);
    generated += strings[random];
  }

  return generated;
};
app.post("/create", async (req, res) => {
  let { longurl } = req.body;
  // console.log(req.body.longurl);
  let code = randomString(4);
  let urldata = {
    longURL: longurl,
    code: code,
    visited: 0,
  };
  const created = await URLmodel.create(urldata);
  // data.push(urldata);
  // fs.writeFileSync("./another.json", JSON.stringify(data), "utf8");
  res.redirect("/");
  // res.send(created);
});
app.get("/url/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  //

  let obj = data.find((urldata) => {
    return urldata.code == id;
  });
  obj.visited += 1;
  res.redirect(obj.longURL);
});
app.get("/delete/:id", async (req, res) => {
  const header = req.params.id;
  console.log(header);
  const deleted = await URLmodel.findOneAndDelete({ _id: header });
  console.log(deleted);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`running at ${host}`);
});
