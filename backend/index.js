const express = require("express");
const app = express();
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const socketServer = require("./socketServer");
const errorMiddleware = require("./middleware/error");
const dotenv = require("dotenv");
// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
require("dotenv").config({ path: "./secret.env" });
// }

console.log(process.env.SMPT_MAIL);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://recruitingwebsite.online",
      "https://www.recruitingwebsite.online",
    ],
    credentials: true,
  })
);

// Route Imports

app.get("/", (req, res) => {
  res.send("Recruitify Api is working fine");
});

const user = require("./routes/userRoute");
const group = require("./routes/groupRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

const posts = require("./routes/postRouter");
const jobs = require("./routes/jobsRouter");
const profile = require("./routes/profileRouter");

app.use("/api/v1", user);
app.use("/api/v1", group);
app.use("/api/friend-invitation", friendInvitationRoutes);
app.use("/api/posts", posts);
app.use("/api/jobs", jobs);
app.use("/api/profile", profile);

// Static files
// Uncomment the following lines if you have a build directory for your frontend
// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware for Errors
app.use(errorMiddleware);

const connectDatabase = require("./database/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

+(
  // Connecting to database
  connectDatabase()
);

const server = http.createServer(app);

// Register Socket.IO server
socketServer.registerSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
  process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
})
});
