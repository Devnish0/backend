import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { UserModel } from "../05_dbmore/userModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
import path from "path";

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  console.log(req.body);

  let user = await UserModel.create({
    name: name,
    email: email,
    url: image,
  });

  res.redirect("/users");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.find();

  res.render("read", { users });
});
app.get("/delete/:id", async (req, res) => {
  let x = req.params.id;
  let z = await UserModel.findOneAndDelete({ _id: x });
  res.redirect("/users");
});
app.get("/edit/:id", async (req, res) => {
  const user = await UserModel.findOne({ __id: req.params.__id });
  res.render("edit", { user });
});
app.post("/edit/:id", async (req, res) => {
  let { name, email, image } = req.body;
  let id = req.params.id;
  console.log("id", id);

  let user = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      name: name,
      email: email,
      url: image,
    },
    { new: true }
  );

  res.redirect("/users");
});
// app.get("*", (req, res) => {
//   res.status(404).send("Route not found");
// });

app.listen(4001);
