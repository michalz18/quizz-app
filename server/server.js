
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI = require("./mongodbkey");
const Quiz = require("./models/quiz");
const Feedback = require("./models/feedback");
const Account = require("./models/account");
const bcrypt = require("bcrypt");
const passportSetUp = require("./passport.js");
const passport = require('passport');
const cookieSession = require("cookie-session");
const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(cookieSession({
  name: "session",
  keys:["quizApp"],
  maxAge: 24*60*60*100
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get("/auth/google", passport.authenticate("google", {scope:["email"]}))
app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  res.cookie('user', req._user);
  res.redirect("http://localhost:3000/");
});


app.get("/quizzes", async (req, res) => {
	try {
		const response = await Quiz.find()
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ message: "ServerError!", error: error.message })
	}
})

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

app.post("/quizzes/history", async (req, res) => {
  try {
    const { CURRENT_QUIZ_ID, score, maxPoints, loggedUser } = req.body;

    const updatedScore = await Account.findOneAndUpdate(
      { email: loggedUser, "quizes.id": CURRENT_QUIZ_ID },
      { $set: { "quizes.$.score": score} },
      { new: true }
    );

    if (!updatedScore) {
      const newScore = await Account.findOneAndUpdate(
        { email: loggedUser },
        { $addToSet: { quizes: { id: CURRENT_QUIZ_ID, score: score, quizLength: maxPoints } } },
        { new: true }
      );

      if (!newScore) {
        return res.status(404).json({ message: "User not found!" });
      }

      return res.status(200).json({ message: "New quiz result saved successfully" });
    }

    res.status(200).json({ message: "Quiz result updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "ServerError!", error: error.message });
  }
});

app.post("/quiz-add", async (req, res) => {
	try {
		const quiz = new Quiz(req.body)
		await quiz.save()
		res.status(201).json({ message: "Quiz created successfully" })
	} catch (error) {
		res
			.status(400)
			.json({ message: "Quiz creation failed", error: error.message })
	}
});

app.get("/score/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const quizIds = user.quizes.map((quiz) => quiz.id);
    const quizzes = await Quiz.find({ _id: { $in: quizIds } });
    const scores = quizzes.map((quiz) => ({
      id: quiz._id,
      title: quiz.title,
      score: user.quizes.find((q) => q.id.toString() === quiz._id.toString())
        .score,
    }));
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: "ServerError!", error: error.message });
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const { user, feedbackText, feedbackRate } = req.body;
    const feedback = await Feedback.create({ user, feedbackText, feedbackRate });
    
    res.status(201).json({ message: "Feedback created successfully", feedback });
  } catch (error) {
    res.status(400).json({ message: "Feedback creation failed", error: error.message });
  }
});



mongoose
	.connect(dbURI)
	.then(() => {
		console.log("Connected to Database!")
	})
	.catch(error => {
		console.log("Unable to connect to Database:", error)
	})

app.listen(8080, () => {
	console.log("Server started on port 8080")
})
