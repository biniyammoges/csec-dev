const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id);
    next();
  } catch (err) {
    next(new ErrorResponse("Not authorized, token failed", 401));
  }
});

const adminOrCommite = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  if (user.role === "committee" || user.role === "admin") {
    next();
  } else {
    return next(
      new ErrorResponse("You are not authorized as admin or commitee", 401)
    );
  }
});

module.exports = { protect, adminOrCommite };
