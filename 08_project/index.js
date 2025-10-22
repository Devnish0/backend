const express = require("express");
const path = require("path");
const app = express();

// function name(req, res, next) {
//   console.log(req.params.name);
//   next();
// }
// the view engine is going to be the ejs
// means we will be using ejs
app.set("view engine", "ejs");
app.use(express.json()); //to read the json incoming data
app.use(express.urlencoded({ extended: true })); //for the url encoded incoming data
app.use(express.static(path.join(__dirname, "public"))); // the static files ie css js files will be available to this folder

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000);
