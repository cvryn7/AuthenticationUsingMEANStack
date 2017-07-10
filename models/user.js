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