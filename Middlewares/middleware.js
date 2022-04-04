const jwt = require("jsonwebtoken");
const User = require("../Blog_Models/user");
require("dotenv").config();
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        next();
        res.locals.user = null;
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
const checkGUser = (req, res, next) => {
  if (!req.user) {
    console.log("NO USER FOUND VMRO");
    res.redirect("/login");
  } else {
    res.locals.user = req.user;
    next();
  }
};

module.exports = { requireAuth, checkUser, checkGUser };
