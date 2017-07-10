/**
 * File for defining database interaction model
 * @type {*}
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../models/database');

//User Schema
const UserSchema = mongoose.Schema({
   name: {
       type: String
   },
   email: {
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