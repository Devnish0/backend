import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/practiceDB`);
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  url: String,
});
export const UserModel = mongoose.model("users", userSchema);
