import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
let rawData = fs.readFileSync("./another.json", "utf-8");
let data = JSON.parse(rawData) ?? [];

const PORT = 4001;

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
  let code = randomString(4);
  let urldata = {
    longURL: longurl,
    code: code,
    visited: 0,
  };

  data.push(urldata);
  fs.writeFileSync("./another.json", JSON.stringify(data), "utf8");
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  let { id } = req.params;
  let obj = data.find((note) => note.code == id);
  data.splice(data.indexOf(obj), 1);
  fs.writeFileSync("./another.json", JSON.stringify(data), "utf8");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`the server os running at port `);
});
