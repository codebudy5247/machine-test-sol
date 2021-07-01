const express = require("express");
const path = require("path");
const colour = require("colors");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

//Database
const connectDB = require("./config/DB");

var app = express();

dotenv.config();

//Connect to DB
connectDB();

//Static Files
//const staticPath = path.join(__dirname, "./public")
//app.use(express.static(staticPath))

//View Engine
app.set('views',path.join(__dirname,'views'))
app.set("view engine","hbs")
//Middlewares
app.use(logger("dev"));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Test Route
// app.get("/", (req, res) => {
//   res.send("API is running....");
// });

//API to send Hi
app.get("/", (req, res) => {
  res.render("index");
});

//Import Routes
app.use("/api", require("./routes/userRoute")); // user Api
app.use("/api", require("./routes/adminRoute")); // Admin Api

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
