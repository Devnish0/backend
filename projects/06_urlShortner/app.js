import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { log } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
let data = [];

(async () => {
  try {
    let rawData = await fsPromises.readFile("./another.json", "utf-8");
    data = JSON.parse(rawData) ?? [];
  } catch (e) {
    data = [];
  }
})();

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
// checking if the url already in the db just pass them that instead of creating new one

let checkIfUrlAlreadyExist = (longurl) => {
  let obj = data.find((note) => note.longURL == longurl);
  if (obj) {
    return obj.code;
  } else {
    return null;
  }
};

app.post("/create", async (req, res) => {
  let { longurl } = req.body;
  let obj = checkIfUrlAlreadyExist(longurl);
  let code;
  if (obj) {
    code = obj;
  } else {
    code = randomString(4);
  }
  const urldata = {
    longURL: longurl,
    code: code,
    visited: 0,
  };

  data.push(urldata);
  await fsPromises.writeFile("./another.json", JSON.stringify(data), "utf8");
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  let { id } = req.params;
  let obj = data.find((note) => note.code == id);
  data.splice(data.indexOf(obj), 1);
  await fsPromises.writeFile("./another.json", JSON.stringify(data), "utf8");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`the server is running at port ${PORT}`);
});
