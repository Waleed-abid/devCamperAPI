const ErrorResponse = require("../utils/erroResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //Log To consle for dev
  console.log(error);

  //Mongoose Bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Duplicate key
  if (err.code === 11000) {
    const message = "Duplicate Fields entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  //   if (err.name === "Error") {
  //     const message = "Some Error";
  //     error = new ErrorResponse(message, 404);
  //   }
  console.log(err.name);
  res
    .status(error.statusCode || 500)
    .send({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
