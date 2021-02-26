const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
      maxLength: [50, "title can't be more than 50 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add event description"],
    },
    startDate: {
      type: Date,
      required: [true, "Please add start date"],
      min: ["2020-1-1", "Date is too past"],
      max: ["2025-1-1", "Date is too far"],
    },
    endDate: {
      type: Date,
      required: [true, "Please add end date"],
      min: ["2020-1-1", "Date is too past"],
      max: ["2025-1-1", "Date is too far"],
    },
    photo: {
      type: String,
      required: true,
      default: "images/no-date.png",
    },
    location: {
      type: String,
      required: true,
      default: "ICPC Lab",
    },
    status: {
      type: String,
      default: "On going",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Event", eventSchema);
