// ? in this we are going to handle and work with forms
// ?handle the process of forms and making sure the data coming from any frontend library , framework , templating engines

// session cookie
// ? mainly used for the login purposes
// ? not entirely

const express = require("express");
const app = express();

app.use(express.json()); //? to read the json data
app.use(express.urlencoded({ extended: true })); //? to read the url encoded data
