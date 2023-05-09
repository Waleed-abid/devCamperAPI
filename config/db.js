const mongoose = require("mongoose");
require("dotenv").config;
mongoose.set("strictQuery", true);
const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017/devcamper");

  console.log(
    `Mongo DB Connected: ${conn.connection.host}`.underline.cyan.bold
  );
};

module.exports = connectDB;
