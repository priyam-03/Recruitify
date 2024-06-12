const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const verifyTokenSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    console.log("token" + token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("id" + decoded.id);
    const user = await User.findById(decoded.id);
    console.log("id" + decoded.id);
    socket.user = user;
    // console.log("socket" + socket);
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
