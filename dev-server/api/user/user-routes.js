import express from "express";
const router = express.Router();

router.post("/user", (req, res) => {
  res.send("post.user - create a user");
});
router.get("/user", (req, res) => {
  res.send("get.user - get all users");
});
router.get("/user/:id", (req, res) => {
  res.send("get.user/:id - get a user by id");
});
router.put("/user", (req, res) => {
  res.send("put.user - update a user");
});
router.delete("/user", (req, res) => {
  res.send("delete.user - delete a user");
});

export default router;
