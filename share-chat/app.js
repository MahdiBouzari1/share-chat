import express from "express";
import cors from "cors";
import { collection, postCollection } from "./mongo.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email, password });
    if (user) {
      res.json({ status: "exist", username: user.username, avatar: user.avatar });
    } else {
      res.json({ status: "notexist" });
    }
  } catch (e) {
    console.error("Error during login:", e);
    res.json({ status: "fail" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const data = { username, email, password, avatar };

  try {
    const check = await collection.findOne({ email });
    if (check) {
      res.json({ status: "exist" });
    } else {
      await collection.insertMany([data]);
      res.json({ status: "notexist", username, avatar });
    }
  } catch (e) {
    console.error("Error during signup:", e);
    res.json({ status: "fail" });
  }
});

app.post("/posts", async (req, res) => {
  const {  username,  text, image, avatar } = req.body;
  const newPost = {  username,  text, image, avatar };

  try {
    const savedPost = await postCollection.create(newPost);
    res.status(201).json(savedPost);
  } catch (e) {
    console.error("Error creating post:", e);
    res.status(500).json({ message: "Failed to create post", error: e });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postCollection.find();
    res.status(200).json(posts);
  } catch (e) {
    console.error("Error fetching posts:", e);
    res.status(500).json({ message: "Failed to fetch posts", error: e });
  }
});

app.post("/posts/like/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postCollection.findById(postId);
    if (post) {
      post.likes += 1;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (e) {
    console.error("Error liking post:", e);
    res.status(500).json({ message: "Failed to like post", error: e });
  }
});

app.post("/posts/unlike/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postCollection.findById(postId);
    if (post) {
      post.likes -= 1;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (e) {
    console.error("Error unliking post:", e);
    res.status(500).json({ message: "Failed to unlike post", error: e });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

