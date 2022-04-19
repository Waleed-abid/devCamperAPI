const User = require("../models/user");
const ErrorResponse = require("../utils/erroResponse");
const asyncHandler = require("../middleware/async");
const advancedResults = require("../middleware/advancedResults");
// Get all users
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).send(res.advancedResults);
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send({ success: true, data: user });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).send({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).send({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).send({ success: true, data: [] });
});
