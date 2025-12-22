import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);
const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
});

export const usermodel = mongoose.model("user", userSchema);
