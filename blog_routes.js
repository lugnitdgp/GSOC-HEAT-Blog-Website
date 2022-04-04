const express = require("express");
const routes = express.Router();
const Controllers = require("./Controllers/controllers");
const requireAuth = require("./Middlewares/middleware");
const checkUser = require("./Middlewares/middleware");
const passport = require("passport");
const gControllers = require("./Controllers/guserControlers");
require("./Controllers/Oauth.js");

// routes.get('*',checkUser.checkUser);
//routers for google users...
routes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
routes.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/guser");
});

routes.get("/guser", checkUser.checkGUser, gControllers.home);
routes.get("/guser/blogs", checkUser.checkGUser, gControllers.getBlog);
routes.post("/guser/blogs", checkUser.checkGUser, gControllers.postBlog);
routes.get("/guser/about", checkUser.checkGUser, gControllers.about);
routes.get("/guser/create", checkUser.checkGUser, gControllers.createblog);
routes.get("/guser/blogs/:id", checkUser.checkGUser, gControllers.getId);
routes.delete("/guser/blogs/:id", checkUser.checkGUser, gControllers.deleteId);

//end of routers for google users..

routes.post("/blogs", requireAuth.requireAuth, Controllers.postblog);
routes.get(
  "/blogs",
  requireAuth.requireAuth,
  checkUser.checkUser,
  Controllers.getblog
);
routes.get("/", requireAuth.requireAuth, checkUser.checkUser, Controllers.home);
routes.get("/signup", checkUser.checkUser, Controllers.signup_get);
routes.post("/signup", Controllers.signup_post);
routes.get("/login", checkUser.checkUser, Controllers.login_get);
routes.post("/login", Controllers.login_post);
routes.get("/logout", Controllers.logout_get);
routes.get(
  "/about",
  requireAuth.requireAuth,
  checkUser.checkUser,
  Controllers.about
);
routes.get(
  "/create",
  requireAuth.requireAuth,
  checkUser.checkUser,
  Controllers.createblog
);
routes.get(
  "/blogs/:id",
  requireAuth.requireAuth,
  checkUser.checkUser,
  Controllers.getid
);
routes.delete("/blogs/:id", requireAuth.requireAuth, Controllers.deleteid);
routes.use(checkUser.checkUser, Controllers.Err);

module.exports = routes;
