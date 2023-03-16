const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const accountSchema = new Schema({
  email: String,
  password: String,
  quizes: Array
});

const Account = model("Account", accountSchema);

module.exports = Account; 