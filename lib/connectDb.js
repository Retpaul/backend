import mongoose from "mongoose";

export async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_COMPASS);
    console.log("Mongodb succesfully connected");
  } catch (error) {
    console.log(error);
  }
}
