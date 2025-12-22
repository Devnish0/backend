import express from "express";
const router = express.Router();
import { users } from "../data/data.js";
import jwt from "jsonwebtoken";
import { authmiddleware } from "../middlewares/authmiddleware.js";

router.post("/login", (req, res) => {
  const request = req.headers;
  let user = users.find(
    (u) => u.username === request.username && u.password === request.password,
  );
  if (!user) res.status(401).json({ message: "invalid credentials" });

  // using the jswt token to signup
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    "shhh", // json secret
    { expiresIn: "1d" },
  );

  res.json({
    message: "welcome abroad sir",
    token,
  });
});
router.get("/", (req, res) => {
  res.send("this is /route");
});

router.get("/admin", authmiddleware, (req, res) => {
  res.send("you are at admin panel");
});
router.get("/user", (req, res) => {
  res.send("hello user");
});
router.get("/editor", (req, res) => {
  res.send("hey there editor");
});
export default router;
