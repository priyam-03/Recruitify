const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    console.error("" + token + " is not a valid token");
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

exports.isAuthenticatedUserGraphQl = catchAsyncErrors(
  async (req, res, next) => {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error(
        "Authorization header is missing or does not contain 'Bearer '"
      );
      return next(new ErrorHander("Please Login to access this resource", 401));
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    try {
      // Verify the token
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object
      req.user = await User.findById(decodedData.id);

      // Proceed to the next middleware or resolver
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return next(new ErrorHander("Invalid token", 401));
    }
  }
);
