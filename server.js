require("dotenv").config;
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const colors = require("colors");
const bootcamps = require("./routes/bootcamps");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const db = require("./config/db");
const errorHandler = require("./middleware/error");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");

const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
//dev logging middleware
//app.use(logger);
db();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(fileupload());
//Sanitize data
app.use(mongoSanitize());

//Set securty headers
app.use(helmet());
// Prevent Xss attacks
app.use(xss());

//set static folder

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use(errorHandler);
const PORT = process.env.port || 5004;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`.yellow.bold)
);

//Handle unhandelded promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection ${err.message}`.red);
  //close server and exit server
  server.close(() => {
    process.exit(1);
  });
});
