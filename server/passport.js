const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const Account = require('./models/account');
const passport = require('passport');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('./googleAuth');
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
  },
  async function(req, accessToken, refreshToken, email, cb) {
    try {
      const userEmail = email.emails[0].value;
      let user = await Account.findOne({ email: userEmail });
      if (!user) {
        user = await Account.create({ email: userEmail });
      }
      req._user = user.email;
      return cb(null, user);
    } catch (error) {
      console.log(error)
    }
  }
));

passport.serializeUser(function(user, done){ done(null, user.id)})
passport.deserializeUser(async function(id, done){ 
  try {
    const user = await Account.findOne({ id });
    done(null, user);
  } catch (error) {
    console.log(error)
  }
})