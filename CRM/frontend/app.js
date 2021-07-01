const express = require("express");
const path = require("path");
const colour = require("colors");
var flash = require("connect-flash");

var app = express();


app.use(express.static(path.join(__dirname, "public")));


//Middlewares
app.use(flash());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//View Engine
app.set('views',path.join(__dirname,'views'))
app.set("view engine","hbs")

//Import Routes


const PORT = 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
