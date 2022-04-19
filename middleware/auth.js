const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/erroResponse");
const User = require("../models/user");

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    //set token from bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }
  //Set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token is sent or Token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, "kjfghsjkgykasldfhf");

    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// Grant accessto specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
