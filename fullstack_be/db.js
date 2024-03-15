//import mongoose for model -schema
const mongoose = require("mongoose");

//to connect database
const connectdb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log("MONGO CONNECTED");
};

//to export connection
module.exports = connectdb;
