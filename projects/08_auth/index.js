import express from "express";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import bcrypt from "bcrypt";
const app = express();

app.use(cookieparser()); //used to parse the cookie

// using bcrypt for

app.get("/", async (req, res) => {
  // ! setting a cookie
  res.cookie("name", "nishank");

  //   const salt = await bcrypt.genSalt(10);
  //   //   generate salts

  //   console.log(await bcrypt.hash("nishank", salt));

  //   console.log(
  //     await bcrypt.compare(
  //       "nishank",
  //       "$2b$10$xj9DNvRralLpbs3WpxlyVeEnxZ3FfskPGwtZpNmoo.ADu75ve3/pC"
  //     )
  //   );
  //   //   actually hashes the password with the help of salt

  //   working with jwts

  let token = jwt.sign({ email: "harsh@gmail.com" }, "secretfooooo");
  res.cookie("token", token);

  res.send();
});
app.get("/read", (req, res) => {
  //   console.log(req.cookies.token);
  let token = req.cookies.token;
  let ver = jwt.verify(token, "secretfooooo");
  res.send(ver);
});
app.listen(4000);
