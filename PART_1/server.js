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

app.use(express.static(__dirname));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//View Engine
app.set('views',path.join(__dirname,'views'))
app.set("view engine","hbs")


//Middlewares
app.use(logger("dev"));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.render("index");
  });

//Routes
//Inserting data in DB and Deleting.
app.use("/api", require("./routes/DataRoute"));

//Enabling Webcam in Nodejs to take pictures for upload
app.post('/upload', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      var dir = 'uploads';

      fs.mkdir(dir, function (err) {
          fs
              .readFile(files.RemoteFile.path, function (err, data) {
                  // save file from temp dir to new dir
                  var fileName = path.join(__dirname, dir, files.RemoteFile.name);
                  console.log(fileName);
                  fs.writeFile(fileName, data, function (err) {
                      if (err) 
                          throw err;
                      
                      res.json({success: 'true'});
                  });
              });
      });

  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
