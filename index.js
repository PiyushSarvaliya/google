const express = require("express")
const app = express()
const session = require("express-session")
const passport = require("passport")
app.use(session({secret : "key"}))

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "553707720547-2ecj8i1nk4n54b2kld4mkl1fqi856smf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8090/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null , profile)
  }
));

passport.serializeUser((user,done)=>{
    return done(null , user)
})
passport.deserializeUser((user , done)=>{
    return done(null , user)
})

app.get("/", (req , res) =>{
    res.send("welcome to my web ")
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile' , "email"] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(8090,()=>{
    console.log("listening port 8090")
})