import express from "express";
import dotenv from "dotenv";
// import { connectDb } from "./lib/connectDb.js";
import { User } from "./model/user.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
// app.use(bodyParser())
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.status(200).json( users );
});

app.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    if (!name || !email || !password || !age) {
      return res
        .status(400)
        .json({ error: "Please Enter all required information" });
    }

    // const newUser = await User.create({
    //   name,
    //   email,
    //   password,
    //   age,
    // });

    const newUser = new User({
      name,
      email,
      password,
      age,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json({ user: newUser });
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(process.env.MONGODB_ATLAS)
  .then(() => {
    console.log("Database connected ");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
