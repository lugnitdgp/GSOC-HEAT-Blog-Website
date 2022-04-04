const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Blog_Models/guser.js");
require("dotenv").config();


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id,
      }).then((currentUser) => {
        if (currentUser) {
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          new User({
            email: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
