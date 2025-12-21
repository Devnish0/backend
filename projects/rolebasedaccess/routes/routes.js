import express from "express";
const router = express.Router();
import allowed from "../middlewares/allowedroles.js";
import auth from "../middlewares/auth.js";

router.get("/", (req, res) => {
  res.send(`this is "${req.url}" route`);
});
router.get("/editor", auth, allowed(["editor"]), (req, res) => {
  res.send("editor dashboard");
});
router.get("/admin", auth, allowed([]), (req, res) => {
  res.send("admin dashboard");
});
router.get("/user", auth, allowed(["user"]), (req, res) => {
  res.send("user route is here niggas");
});

export default router;
