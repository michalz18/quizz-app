const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI = require("./mongodbkey");
const Quiz = require("./models/quiz");
const Account = require("./models/account");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/quizzes", async (req, res) => {
  try {
    const response = await Quiz.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "ServerError!", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Account.findOne({ email: email });
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        res.status().json([]);
      }
      res.status(200).json(result ? { email: user.email } : []);
    });
  } catch (error) {
    res.status(500).json({ message: "ServerError!", error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailResponse = await Account.find({ email: email });
    if (emailResponse.length != 0) {
      res.status(200).json([]);
      return;
    }
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        res.status(200).json([]);
      }
      const response = await Account.create({ email: email, password: hash });
      res.status(200).json({ email: response.email });
    });
  } catch (error) {
    res.status(500).json({ message: "ServerError!", error: error.message });
  }
});

app.post("/password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await Account.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or password is incorrect" });
    }
    bcrypt.compare(oldPassword, user.password, function (err, result) {
      if (err) {
        console.log(err);
        res.status().json([]);
      }
      if (result) {
        bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
          if (err) {
            console.log(err);
            res.status(200).json([]);
          }
          const response = await Account.findOneAndUpdate({_id: user._id}, {password: hash})
          res.status(200).json({ message: "Password updated successfully" });
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "ServerError!", error: error.message });
  }
});

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log("Unable to connect to Database:", error);
  });

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
