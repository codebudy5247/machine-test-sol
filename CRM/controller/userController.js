const UserModel = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const store = require('store')

exports.CreateUser = async (req, res) => {
  const { Name,PhoneNumber, Email_id, Password } = req.body;
  try {
    let user = await UserModel.findOne({ PhoneNumber });
    if (user) {
      res.status(401).json({ msg: "user already exist" });
    }
    const newUser = new UserModel({
      Name,
      PhoneNumber,
      Email_id,
      Password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.Password = await bcrypt.hash(Password, salt);
    const data = await newUser.save();
    const payload = {
      id: newUser._id,
      Role: newUser.Role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, data , msg: "Account Created",status: true});
      }
    );
    
  } catch (error) {
    res.status(401);
    console.log(error);
  }
};
exports.LoginUser = async (req, res) => {
  const { PhoneNumber, Password } = req.body;

  try {
    let user = await UserModel.findOne({ PhoneNumber });
    if (!user) {
      res.status(401).json({ msg: "user not found" });
    }
    const checkpassword = await bcrypt.compare(Password, user.Password);
    if (!checkpassword) {
      return res.status(401).json({ msg: "Wrong password" });
    }
    const payload = {
      id: user._id,
      Role: user.Role,
    };
    console.log(payload);
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, user , status: true,msg: "Successfull Login"});
      }
    );
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};
