import express from "express";
const router = express.Router();

router.get("/hello", (req, res) => {
  res.json("hey there its all here");
});
router.get("/wow", (req, res) => {
  res.json("wow called");
});
// we can have same methods on same routes but for different types
// like different for get post etc etc
router.get("/home", (req, res) => {
  res.json("method: get");
});
router.put("/home", (req, res) => {
  res.json("method: put");
});
router.post("/home", (req, res) => {
  res.json("method: post");
});
router.delete("/home", (req, res) => {
  res.json("method: delete");
});

export default router;
