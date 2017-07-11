/**
 * File containing all the routes for <hostname>/users/<Anything> url
 **/

//Add required imports

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register
//here we don't need to put /users/regesters, its handled by the express.
router.post('/register', (req, res, next) => {
    //create new User object from the request bocy
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

//Authenticating user
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        //compare the password and if successfull, issue a token
        User.comparePassword(password, user.password, (err, isMatch) => {
           if (err) throw err;
           if (isMatch) {
               const token = jwt.sign(user, config.secret, {
                  expiresIn: 604800 // 1 week in seconds
               });

               res.json({
                   success: true,
                   token: 'JWT' + token,
                   user: {
                       id: user._id,
                       name: user.name,
                       username: user.username,
                       email: user.email
                   }
               });
           } else {
               return res.json({success: false, msg: 'Wrong Password'});
           }
        });
    });
});

//User Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

//It is important to export the router to made it available for the express app defined in app.js
module.exports = router;