/**
 * File containing all the routes for <hostname>/users/<Anything> url
 **/

//Add require imports

const express = require('express');
const router = express.Router();

//Register
//here we don't need to put /users/regesters, its handled by the express.
router.post('/register', (req, res, next) => {
    res.send('REGISTER');
});

//Authenticating user
router.get('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

//User Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

//Route to check if users token matches
router.get('/validate', (req, res, next) => {
   res.send('VALIDATE');
});

//It is important to export the router to made it available for the express app defined in app.js
module.exports = router;