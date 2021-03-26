const express = require("express");
const router = express.Router();
const Post = require("../../model/Post");

router.post("/post", async (req, res) => {
  try {
    await Post.create(req.body);
    res.status(200).send({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    let filter = {};
    filter = req.query;
    const allPosts = await Post.find(filter);
    res.status(200).send({ allPosts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).send({ post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.patch("/post/:id", async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).send({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.deleteOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).send({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
