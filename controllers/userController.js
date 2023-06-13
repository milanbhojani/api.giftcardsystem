//const multer = require("multer");
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Giftcard = require("../models/Giftcard");

/**
 * POST /
 * Create New user sign up
 */
exports.postUser = async (req, res) => {
  console.log(req.body);

  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await User.create(newUser);
    console.log("New User has been added", user);

    //  res.send({msg : "user succefully registered from API"})
    return res.json({ msg: "user registred! from API" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ msg: "user already exist from API" });
    }
    return res.json({ msg: error });
  }
};

/**
 * POST /
 * user sign in
 */
exports.postUserlogin = async (req, res) => {
  console.log(req.body);
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Plz filled the field properly from API" });
    }

    const userlogin = await User.findOne({ email: email });

    if (userlogin) {
      const ismatch = await bcrypt.compare(password, userlogin.password);

      token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 300000),
        httpOnly: true,
      });

      if (!ismatch) {
        return res.status(400).json({ error: "Invalid password from API" });
      } else {
        return res.json({
          message: "Login successfully from API",
          status: 1,
          token: token,
        });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credientials from API" });
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * GET /
 * fetch home page details
 */
exports.getdata = async (req, res, next) => {
  // return res.json({message: "about run successfully", status : 1 });

  try {
    const token = req.headers.authorization;

    const userauth = await User.findOne({ tokens: token });

    if (userauth) {
      return res.json({
        message: "user data getted successfully.",
        data2: req.rootUser,
        token: token,
        data: userauth,
      });
    } else {
      return res.status(400).json({ error: "Invalid user" });
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * POST /
 * Add new gift card details
 */
exports.postgiftcard = async (req, res) => {

  let token = JSON.parse(atob(req.body.token.split('.')[1]))
  console.log("Gift card Data :",token);
  
  const newGiftcard = new Giftcard({
    companyName: req.body.companyName,
    category: req.body.category,
    amount: req.body.amount,
    expiryDate: req.body.expiryDate,
    profit: req.body.profit,
    poster: req.body.poster,
    createdBy:token._id
  });

  try {
    if (Number(req.body.profit) < Number(req.body.amount)) {
      // return  res.json({msg : 'profit is lessthan amount'})
      return res.status(499).json({ error: "profit is lessthan amount" });
    } else {
      const addGiftcard = await Giftcard.create(newGiftcard);
      console.log("New Giftcard has been added", addGiftcard);

      return res.json({ msg: "giftcard added from API", data: addGiftcard });
    }
  } catch (error) {
    return res.json({ msg: error });
  }
};
