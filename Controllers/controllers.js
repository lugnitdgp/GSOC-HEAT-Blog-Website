const User = require("../Blog_Models/user.js");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const maxAge = 24 * 3 * 60 * 60;
let EMAIL = "";
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};
const handle = (err) => {
  let error = { email: "", password: "" };
  if (err.message === "*Email not registered") {
    error.email = err.message;
  }
  if (err.message === "*Incorrect Password") {
    error.password = err.message;
  }
  if (err.code === 11000) {
    error.email = "*Already Taken";
    return error;
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};
const home = (req, res) => {
  res.render("index", { title: "Home" });
};
const postblog = async (req, res) => {
  const { title, main } = req.body;
  const blog = { title: title, main: main };
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      let user = await User.findById(decodedToken.id);
      User.updateOne(
        {
          email: user.email,
        },
        {
          $push: { blog: blog },
        }
      )
        .then((result) => {
          res.redirect("/blogs");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    res.locals.user = null;
    next();
  }
};
const getblog = (req, res) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
    User.findById(decodedToken.id)
      .then((result) => {
        res.render("view-blogs", { title: "Blogs", data: result.blog });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
const about = (req, res) => {
  res.render("about", { title: "About Us" });
};
const createblog = (req, res) => {
  res.render("create", { title: "Create Blog" });
};
const getid = (req, res) => {
  const id = req.params.id;
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
    const query = User.findOne({ _id: decodedToken.id });
    query.select("blog -_id");
    query.exec(function (err, data) {
      let i = 0;
      for (i = 0; i < data.blog.length; i++) {
        if (data.blog[i]._id == id) {
          break;
        }
      }
      res.render("details", { title: "Blog Details", data: data.blog[i] });
    });
  });
};
const deleteid = (req, res) => {
  const id = req.params.id;
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
    User.findByIdAndUpdate(
      decodedToken.id,
      { $pull: { blog: { _id: id } } },
      function (err, node) {
        if (err) {
          console.log(err);
        }
        res.json({ redirect: "/blogs" });
      }
    );
  });
};
const signup_get = (req, res) => {
  res.render("signup", { title: "Sign-Up" });
};
const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(201).json({ user: user._id });
    this.EMAIL = email;
  } catch (err) {
    const errors = handle(err);
    res.status(400).json({ errors });
  }
};

const login_get = (req, res) => {
  res.render("login", { title: "Login" });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(200).json({ user: user._id });
    this.EMAIL = email;
  } catch (err) {
    const errors = handle(err);
    res.status(400).json({ errors });
  }
};
const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
const Err = (req, res) => {
  res.status(404).render("404", { title: "Error" });
};

module.exports = {
  home,
  postblog,
  getblog,
  about,
  createblog,
  getid,
  deleteid,
  Err,
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
};
