import express from "express";
import routes from "./routes/routes.js";
const app = express();

app.use("/", routes);
app.listen(4000, () => {
  console.log("server running at localhost:4000");
});
