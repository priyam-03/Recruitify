const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const yearValidator = {
  validator: function (value) {
    return validator.isInt(String(value), { min: 1900, max: new Date().getFullYear() + 10 });
  },
  message: "Please enter a valid year"
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "Userauth" }],
    clusters: [
      {
        name: { type: String },
        friendlist: [{ type: Schema.Types.ObjectId, ref: "Userauth" }],
      },
    ],
    avatar: {
      fileName: {
        type: String,
        required: true,
      },
      filePath: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        required: true,
      },
      fileSize: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    educations: [
      {
        institution: {
          type: String,
          default: '',
          maxLength: [100, "Institution Name cannot exceed 100 characters"],
        },
        specialization: {
          type: String,
          default: '',
          maxLength: [100, "Specialization cannot exceed 100 characters"],
        },
        gpa: {
          type: Number,
        },
        otherInfo: {
          type: String,
          default: '',
          maxLength: [200, "Other information cannot exceed 200 characters"],
        },
        timeStrap: {
          isCurrent: { type: Boolean, default: false },
          start_year: { type: Number, default: new Date().getFullYear(), validate: yearValidator },
          end_year: { type: Number, validate: yearValidator }
        }
      }
    ],
    experiences: [
      {
        organization: {
          type: String,
          default: '',
          maxLength: [100, "Organization name cannot exceed 100 characters"],
        },
        role: {
          type: String,
          default: '',
          maxLength: [100, "Role cannot exceed 100 characters"],
        },
        otherInfo: {
          type: String,
          default: '',
          maxLength: [200, "Other information cannot exceed 200 characters"],
        },
        timeStrap: {
          isCurrent: { type: Boolean, default: false },
          start_year: { type: Number, default: new Date().getFullYear(), validate: yearValidator },
          end_year: { type: Number, validate: yearValidator }
        }
      }
    ],
    skills: [
      {
        skill_name: {
          type: String,
          maxLength: [100, "Skill name cannot exceed 100 characters"],
          required:true,
          unique:true,
        },
        level: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
          required:true,
        }
      }
    ],
    links: [
      {
        field: {
          type: String,
          enum: ['github', 'linkedIn'],
          default: '',
        },
        link: {
          type: String,
          default: '',
        },
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Userauth", userSchema);