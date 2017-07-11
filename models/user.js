/**
 * File for defining database interaction model
 * @type {*}
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
   name: {
       type: String
   },
   email: {
       type: String,
       required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
       type: String,
       required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

//Define function to query User db

//define and export function to find user by id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

//define and export function to find user by username
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

//define and export function to add user to db. addUser also
//hashes the password before adding it to the database.
module.exports.addUser = function(newUser, callback) {
    //where 10 is the number rounds to user. 10 is default value
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}