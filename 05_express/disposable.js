// import express from "express";
// const app = express();
// app.listen(3000);

// // ! there are three ways to write middle ware

// // 1. using app.use
// // for only /1 route
// app.use("/1", (req, res, next) => {
//   res.send("Hello from middleware 1");
//   console.log("Request received");
//   // If middleware sends a response (res.send/res.end), do not call next() afterward — that can cause "headers already sent" or duplicate responses.
//   // If middleware should pass control to later handlers, don’t send a response; call next() instead.
// });

// app.use("/2", (req, res, next) => {
//   console.log("This runs for /2 route");

//   next();
// });

// // for all routes
// app.use((req, res, next) => {
//   console.log("This runs for all routes");
//   next();
// });

// function name(x, y) {
//   return x + y;
// }

// let add = name(1, 2);

// console.log(add);

// key takeaway is
// app.use to make a response for every request
// app.get is to make a response fot a particular route // api endpoint

const express = require("express");

const app = express();

//*listen to all the request from the server
//*log the uncommon called from which route
//*send the text `wow is this really uuu

// `

app.use((req, res, next) => {
  // console.log(`/uncommon called ${req.url}`);

  next();
  //* next() tell pleas go to the another middleware
  //* it means line 53 will run after this middleware
});

// * will run after the above middleware
app.use((req, res, next) => {
  // console.log("/heythere called");
  next();
  // * now this middleware tell to go to the route handler ie line 61
});

//* this tell the route handler means this will run after the above two middleware
//* and also send the response to the client means `wow is this really uuuu`

app.get("/uncommon", (req, res, next) => {
  res.send("wow is this really you uuuu");
  next();
});

// ------------------------//------------------------------------------------
// * another way of writing middlewares are using the funcitons
let acces = 0;

function funcMiddle(req, res, next) {
  acces++;
  console.log("this was called by the function middleware", acces);
  next();
}

//? app.use(funcMiddle); // the function middle ware will be used for every request

//* the funcMiddle middware should only run for this route
app.get("/froute", funcMiddle, (req, res, next) => {
  res.send("function route called");
  return next();
});

// !error handling in expressjs

//*normal route
app.get("/error", (req, res, next) => {
  // res.send("nisahnk");
  // * when you need to call for an error use
  // * return next(new Error('message')) //stops all the middleware and goes to the next error-hanling middleware
  // * the error gets printed in the console
  return next(new Error("forced error"));
});

//* example of the error handler
app.use((err, req, res, next) => {
  // * logs the error stack in the console

  console.error(err.stack);
  // *gives out the status and response as something broke
  res.status(404).send("Something broke!");
  // res.send("wow");
});

app.listen(3010);
