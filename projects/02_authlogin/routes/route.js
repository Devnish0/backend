import express from "express";
const router = express.Router();
import { users } from "../data/data.js";

router.post("/login", (req, res) => {
  const request = req.headers;
  let user = users.find(
    (u) => u.username === request.username && u.password === request.password,
  );
  if (!user) res.status(401).json({ message: "invalid credentials" });

  res.json({
    message: "welcome abroad sir",
    role: user.role,
    token: user.token,
  });
});
router.get("/", (req, res) => {
  res.send("this is /route");
});

router.get("/admin", (req, res) => {
  res.send("you are at admin panel");
});
router.get("/user", (req, res) => {
  res.send("hello user");
});
router.get("/editor", (req, res) => {
  res.send("hey there editor");
});
export default router;
