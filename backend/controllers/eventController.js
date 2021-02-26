const Event = require("../models/eventModel");
const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

// @route POST /api/v1/events
// @desc Create event - admin
exports.createEvent = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  req.body.user = user._id;

  let photo;

  if (req.files) {
    const file = req.files.file;

    //   check for file type
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse("Please upload image file", 400));
    }

    if (file.size > process.env.MAX_PHOTO_SIZE) {
      return next(new ErrorResponse("File size is too big", 400));
    }

    // create custom name
    file.name = `event_${file.name}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse("Problem with file uploading", 500));
      }
      photo = `uploads/${file.name}`;
      req.body.photo = photo;
      console.log(photo);

      const createdEvent = await Event.create(req.body);

      res.status(200).json({
        success: true,
        alert: "Event is created successfully",
        data: createdEvent,
      });
    });
  } else {
    const createdEvent = await Event.create(req.body);

    res.status(200).json({
      success: true,
      alert: "Event is created successfully",
      data: createdEvent,
    });
  }
});

// @route GET /api/v1/events
// @desc get events - all user
exports.getEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find().populate({
    path: "user",
    select: "fullName email photo",
  });

  res.status(200).json({
    success: true,
    data: events,
  });
});

// @route GET /api/v1/events/:id
// @desc Get event - all user
exports.getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate({
    path: "User",
    select: "fullName email photo",
  });

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @route PUT /api/v1/events/:id
// @desc Update event - admin
exports.updateEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  const updatedEvent = await Event.findByIdAndUpdate(event._id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: "User",
    select: "fullName email",
  });

  res.status(200).json({
    success: true,
    data: updatedEvent,
  });
});

// @route DELETE /api/v1/events/:id
// @desc Delete event - admin
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate({
    path: "User",
    select: "fullName email photo",
  });

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  await event.remove();

  res.status(200).json({
    success: true,
    alert: "Event deleted successfully",
  });
});
