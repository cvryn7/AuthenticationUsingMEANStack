/**
 * File containing all the routes for <hostname>/users/<Anything> url
 **/

//Add required imports

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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
    res.send('AUTHENTICATE');
});

//User Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

//It is important to export the router to made it available for the express app defined in app.js
module.exports = router;