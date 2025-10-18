// express.js Framework

//? introduction to Express.js
// EXPRESS js is just a npm package
// Framework -> gives a flow to form the application
// manages everything from recieving requests to giving responses
// s

// NOTE: Quick overview (high level)
// - Express wraps Node's http server and gives helpers: routing, middleware, res helper methods (res.send, res.json, res.status), and easier error handling.
// - Use Express when you want to build APIs/web apps faster. For tiny scripts or extreme performance tuning, Node's raw http module is enough.

// ? routes
// anything after the url is routes
// youtube.com/  <- this is default route
// youtube.com/subscriptions <- this is a route

// ? middle ware
// middle ware is a function which is executed between the request and response cycle
// koi bhi kaam jo hume run karana ho route ko chalane se phle to hum middleware ka use kr sakte hai
// example -> jaise hi koi request aati hai to console me uski details print krdo
// jb bhi server koi server request accept karta hai waha se routes ke phle middleware chalta hai
// hum khud bhi middleware bana sakte hai

// NOTE: Middleware basics (concise)
// - Signature: (req, res, next) => { ... }.
// - Must call next() to pass control to next middleware/route handler, unless you end the response (res.send/res.end).
// - Order matters: app.use(...) registers middleware that runs in registration order.
// - Use app.use(express.json()) to parse JSON bodies for POST/PUT requests.
// - To attach middleware only for a route: app.get('/path', middleware, handler).
// - Error-handling middleware signature: (err, req, res, next) => { ... }.

// ? nodemon is used to auto turnoff and turn on th server
// Nodemon watches files and restarts the server on changes. Install: npm i -D nodemon
// Run: npx nodemon ./05_express/script.js or add a script "dev": "nodemon ./05_express/script.js"

// Helpful testing tips (curl)
// curl http://localhost:3001/
// curl http://localhost:3001/profile
// Curl shows raw response so you can verify routing and status codes quickly.

// Common response helpers you will use:
// res.send("text or buffer");          // sends text/html by default
// res.json({ key: "value" });          // sends JSON with application/json header
// res.status(404).send("Not found");   // set status then send

import express from "express";

const app = express();

// first way to create middle ware
//? app.use is used to use middleware
// ye har route ke phle chalega
// app.use(function (req, res, next) {
//   console.log("bete middle ware chal gaya hai tera tel khatam hai ab"); //? this will run on every request
//   next(); // request accept hogyi ab aage badh
//   // next is a function which is used to move to the next middleware or route handler
// });

// app.use(function (req, res, next) {
//   console.log("ek aur baar laadhchate");
//   //? this will run on every request
//   // request accept hogyi ab aage badh
//   // next is a function which is used to move to the next middleware or route handler
//   next();
// });

// second way to create middle ware

const mymiddleware = (req, res, next) => {
  console.log("mkichui");
  next();
};

app.get("/", mymiddleware, (req, res) => {
  res.send("this is on / route");
});
app.get("/profile", (req, res) => {
  res.send(" /profile blah all the best blah");
});
app.get("/about", (req, res) => {
  res.send("this is a about page");
});

// NOTE: app.listen
// - app.listen(3001) starts the server on port 3001.
// - In real projects use process.env.PORT || 3001 so you can override the port in environments:
//   const PORT = process.env.PORT || 3001;
//   app.listen(PORT, () => console.log(`listening on ${PORT}`));
app.listen(3001);

//---------------------------------------------------------------------------------------------//

// ?! error handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("something broke");
//   sabse last me lagana hai
});


