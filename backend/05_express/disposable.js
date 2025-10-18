import express from "express";
const app = express();
app.listen(3000);

// ! there are three ways to write middle ware

// 1. using app.use
// for only /1 route
app.use("/1", (req, res, next) => {
  res.send("Hello from middleware 1");
  console.log("Request received");
  // If middleware sends a response (res.send/res.end), do not call next() afterward — that can cause "headers already sent" or duplicate responses.
  // If middleware should pass control to later handlers, don’t send a response; call next() instead.
});

app.use("/2", (req, res, next) => {
  console.log("This runs for /2 route");
  
  next();
});

// for all routes
app.use((req, res, next) => {
  console.log("This runs for all routes");
  next();
});
