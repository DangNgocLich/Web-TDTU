// config/passport.js

// load những thứ chúng ta cần
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Lấy thông tin những giá trị auth
var configAuth = require('./auth');

// load  user model
var User = require('../model/User');

module.exports = function(passport) {


    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))    

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {

                // // tìm trong db xem có user nào đã sử dụng google id này chưa
                User.findOne({ 'userName': profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        if (profile.emails[0].value.split("@")[1] == "student.tdtu.edu.vn") {
                            // if the user isnt in our database, create a new user
                            var newUser = new User();

                            // set all of the relevant information
                            // newUser.google.id = profile.id;
                            // newUser.google.token = token;
                            newUser.displayName = profile.displayName;
                            newUser.Role = "1"
                            newUser.UserName = profile.emails[0].value; // pull the first email
                            return done(null, newUser);
                            // save the user
                            // newUser.save(function (err) {
                            //   if (err)
                            //     throw err;
                            //   return done(null, newUser);
                            // });
                        } else
                            return done(null, null)
                    }
                });
            });

        }));
};