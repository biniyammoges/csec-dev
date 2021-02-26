const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
    },
    fullName: String,
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      select: false,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "committee", "admin"],
      default: "user",
    },
    photo: {
      type: String,
      default: "images/no-image.png",
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    idNumber: String,
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "5th"],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
