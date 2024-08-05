import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sharechat-login", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection to MongoDB failed", error);
  }
};

connectDB();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
});

const postSchema = new mongoose.Schema({
  username: String,
  text: String,
  image: String,
  avatar: String,
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

export const collection = mongoose.model("User", userSchema);
export const postCollection = mongoose.model("Post", postSchema);
