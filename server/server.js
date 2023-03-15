const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI = require("./mongodbkey")
const Accounts = require("./models/account")

const app = express();

app.use(cors());
app.use(express.json());

mongoose
.connect(dbURI)
.then(() => {
    console.log("Connected to Database!")
})
.catch(error => {
    console.log("Unable to connect to Database:", error)
})

app.get("/accounts", async (req, res) => {
    try{
        const accountsData = await Accounts.find();
        res.json(accountsData)
    } catch (error) {
        console.log("Error fetching accounts data:", error);
        res.status(500).json({ error: "Error fetching accounts data" });
      }
})

app.listen(8080, () => {
    console.log("Server started on port 8080");
  });