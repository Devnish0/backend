import express from "express";
const app = express();
import route from "./routes/route.js";

app.use("/auth", route);
app.listen(4000, () => {
  console.log("app is running at port 4000");
});
