const express = require("express");
const app = express();
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const socketServer = require("./socketServer");
const group = require("./routes/groupRoutes");
const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./secret.env" });
}
console.log(process.env.SMPT_MAIL);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// app.set("trust proxy", 10);
// Route Imports
app.get('/',(req,res)=>{
  res.send("Recruitify Api is working fine in app-runner");
})
const user = require("./routes/userRoute");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
app.use("/api/v1", user);
app.use("/api/v1", group);
app.use("/api/friend-invitation", friendInvitationRoutes);
const server = http.createServer(app);
socketServer.registerSocketServer(server);
// app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);
const connectDatabase = require("./database/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config.env" });
}

// Connecting to database
connectDatabase();
console.log(process.env.PORT);

server.listen(4000, () => {
  console.log(`Server is working on http://localhost:4000`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
