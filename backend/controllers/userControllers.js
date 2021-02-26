const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const genToken = require("../utils/genToken");
const path = require("path");

// @route POST /api/v1/auth/login
// @desc Login user
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password ", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid email or password ", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid email or password ", 401));
  }

  res.status(200).json({
    success: true,
    data: user,
    alert: "Logged in successfully",
    token: genToken(user._id),
  });
});

// @route POST /api/v1/auth/register
// @desc Register user
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new ErrorResponse(`Email ${email} is already taken`, 400));
  }

  const newUser = new User({ firstName, lastName, email, password });

  const user = await newUser.save();

  res.status(200).json({
    success: true,
    data: user,
    alert: "Registered successfully",
    token: genToken(user._id),
  });
});

// @route Get /api/v1/auth/user
// @desc Get user profile
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    photo: user.photo,
    email: user.email,
    idNumber: user.idNumber,
    year: user.year,
    sex: user.sex,
    role: user.role,
    createdAt: user.createdAt,
  });
});

// @route PUT /api/v1/auth/user
// @desc Update user
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.sex = req.body.sex || user.sex;
    user.idNumber = req.body.idNumber || user.idNumber;
    user.year = req.body.year || user.year;

    const updatedUser = await user.save();

    res.json({
      success: true,
      alert: "Updated successfully",
      data: updatedUser,
      token: genToken(user._id),
    });
  } else {
    return next(new ErrorResponse("User not found", 404));
  }
});

// @route PUT /api/v1/auth/:userId/password
// @desc Update user password
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { password, newPassword } = req.body;

  if (!password || !newPassword) {
    return next(new ErrorResponse("Please provide all password fields"), 401);
  }

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Please enter correct password", 401));
  }

  if (user && isMatch) {
    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      alert: "Password updated successfully",
      // data: user,
    });
  }
});

// // @route PUT /api/v1/auth/:userId/photo
// // @desc upload user photo
exports.uploadUserPhoto = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  if (!req.files) {
    return next(new ErrorResponse("Please upload file", 400));
  }

  const file = req.files.file;

  // check for file type
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Please upload an image file"));
  }

  // check for size
  if (file.size > process.env.MAX_PHOTO_SIZE) {
    return next(new ErrorResponse("File size is too big", 400));
  }

  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse("Problem with the file upload", 500));
    }
    await user.updateOne({ photo: `/uploads/${file.name}` });
    res.json({
      success: true,
      alert: "Image uploaded successfully",
      data: user,
    });
  });
});

// @route GET /api/v1/auth/users/admin
// @desc Get all users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @route GET /api/v1/auth/:userId/admin
// @desc Get single user by id for admin
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @route DELETE /api/v1/auth/:userId/admin
// @desc delete user by id
exports.deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    alert: "User deleted successfully",
  });
});

// @route PUT /api/v1/auth/:userId/admin
// @desc Update user by id
exports.updateUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  if (user.role === "admin" || user.role === "committee") {
    return next(
      new ErrorResponse(
        "You are not authorized to edit admin or committe account",
        401
      )
    );
  }

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.sex = req.body.sex || user.sex;
    user.id = req.body.id || user.id;
    user.year = req.body.year || user.year;

    await user.save();

    res.status(200).json({
      success: true,
      alert: "User updated successfully",
    });
  }
});
