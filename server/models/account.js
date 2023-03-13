const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const accountSchema = new Schema({
  email: String,
  password: String,
});

const account = model("account", accountSchema);

module.exports = account;