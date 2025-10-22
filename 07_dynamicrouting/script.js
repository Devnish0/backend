// ! dynamic routing
//* dynamic routing and
//* how to get data from frontend at backend route

// ? setting up the parsers for forms
// ? setting up the ejs pages
//    -installing ejs from npm
//    - setup of ejs as a view engine

// ? setting up public static files

const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());
// to read the json data if incoming
app.use(express.urlencoded({ extended: true }));
// to read the url encoded data if incoming

// all the static files should go here ie html css js ejs etc
app.use(express.static(path.join(__dirname, "public")));
// hr request ke liye static files yaha dhundni hai
// the path .join is just there to make it as dirname/public
app.set("view engine", "ejs");

// ? at the `/` route render the index page from the views
app.get(`/`, (req, res, next) => {
  // res.send("index");
  res.end(
    "<h1>hey tehre i hope you get the data</h1><br><button>submit</button>"
  );
  // res.send("hey tehre i hope you get the data");

  // fun fact res.end comes from the node and it is pure html no headers etc
  //  whereas res.send is an express thing that knows what we are sending ie the html headers can be set according to the data
});

app.get(`/home`, (req, res, next) => {
  res.render("home");
});
app.listen(3300, () => {
  console.log("it is running");
});

// --------------ejs-----------------------//

// ejs can perform many tasks like handling 2+2
// just do
// <%=2+2 %>

//! Dynamic routing
// imagine there is a page
// ? /author/nishank
// ? /author/john
// ? /author/mary

// * here we cannot make route for each author
// * so we use dynamic routing
// ? broser pr jao -> wo url likho jo chaiye -> url route ko create karo -> res bhej do
// ? now if url ko dynamic bnana hai to check karo url ka kaunsa part dynamic (baar baar change ho raha hai)
// ? example -> /author/nihsank , /author/harsh me /author/<- this is getting changed
// ? simply just us part ke aage : lagana hai and it gets dynamic
// ? example -> /author/:nishank

app.get("/author/:username", (req, res) => {
  const routename = req.params.username;
  //? this gives us the route name which is getting accessed
  res.send(`this is route ${routename}`);
});

//  maing a dynamic route for /author/usernam/age

app.get("/author/:username/:age", (req, res) => {
  // res.send(
  // `hey there the name is ${req.params.username} and the age is  ${req.params.age}`
  // );
  res.send(req.params);
});
