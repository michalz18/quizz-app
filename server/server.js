const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI = require("./mongodbkey")
const Accounts = require("./models/account")
const Quiz = require("./models/quiz");
const Account = require("./models/account");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/quizzes", async (req, res) => {
    try {
        const response = await Quiz.find()
      
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: 'ServerError!', error: error.message })
    }
})

app.get("/user", async (req, res) => {
    try {

        const response = await Account.find({"email": req.query.email, "password": req.query.password})
        const user = response[0];
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'ServerError!', error: error.message })
    }
})


mongoose
    .connect(dbURI)
    .then(() => {
        console.log("Connected to Database!")
    })
    .catch(error => {
        console.log("Unable to connect to Database:", error)
    })

app.listen(8080, () => {
    console.log("Server started on port 8080");
});