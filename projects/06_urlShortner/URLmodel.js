import mongoose from "mongoose";
mongoose.connect(`mongodb://127.0.0.1:27017/URLs`);
const URLSchema = mongoose.Schema({
  longURL: String,
  code: String,
  visited: Number,
});
export const URLmodel = mongoose.model("urls", URLSchema);
