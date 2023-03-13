const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI = require("./mongodbkey")

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

app.listen(8080, () => {
    console.log("Server started on port 8080");
  });