//! initialzing a node project
//! node is a complete runtime of js so it can be used for making backend but not just for backend
//! that is why we use express because it is mainly for the backend purposes

//? 1. getting the express in our app
// const express = require("express");
import express from "express";

//? 2. assinging a variable to the fucntion express that we have recieved
const app = express();

// add body parsing middleware BEFORE route registration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//? 4. assigning a command in the pakage.json to run the nodemon on npm run dev
// ?5. the methods we get through the EXPRESSJS are(HTTPS METHODS)
//* GET POST PUT DELETE

// ?6. APP.GET REQUEST
// app.get("/route",(request,response,next)=>{callback function})
// app.get("/hello", (req, res) => {
//   res.send("wooohoooo"); //for sending a html data to the request at /hello route
//   res.json([]); // for sending json data to the request at /hello route
// });

// ? 7. now to make our projects a little organised in here(editor) or on ht eweb /route we uses routes
// ? creating a routes folder()
// ? auth , movie , user , watchlist

//? importing routes in here

//? 8. also instead of app.get we will be importing express.Router()
//? 9. importing the route from the file to here
import movieRoute from "./routes/movieRoute.js";

// API Route
app.use("/movies", movieRoute);
// ? now what is it doing its managing the routes in a way
// ? this route will fucntion as /movies/hello

//? 3. starting our own server
// const PORT = 8080;
// // existing listen/start logic (replace or ensure single listener)
// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

// ?4.  now we can install prisma to write schema to our db
// *commands :
// `npx prisma init`
// `npm i -D prisma `
// `npm i  @prisma/client`
// `npm i dotenv`

import { config } from "dotenv";
config();

// make a config folder in src
// making a db config there

// ?6. importing the prisma connectdb and disconnect db here
import {
  getPrismaClient,
  connectPrisma,
  disconnectPrisma,
  registerShutdownHandlers,
} from "./config/db.js";

// connectDB();

// write the error handling here for saving form data leaks

// ? 7. writing tables in the schema

// ? 8. writing the controllers
import authRoute from "./routes/authRoute.js";
app.use("/auth", authRoute);
app.use("/new",(req,res)=>{
    res.send("hey there")
})

// ensure DB is connected before starting the server
await connectPrisma();
registerShutdownHandlers();

const PORT = process.env.PORT || 3000;
// existing listen/start logic (replace or ensure single listener)
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
