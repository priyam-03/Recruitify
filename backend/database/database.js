// require("dotenv").config();
require("dotenv").config({ path: "../secret.env" });
const mongoose = require("mongoose");
const connectDatabase = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Priyam:Pkpriyam%4069@cluster0.ukqohp4.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,

        // useCreateIndex: true,
      }
    )
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
      // console.log("mongodb connected");
    })
    .catch((err) => {
      console.log("The error is: - " + err);
    });
};

module.exports = connectDatabase;
