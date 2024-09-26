import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  married: { type: Boolean, default: false },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
