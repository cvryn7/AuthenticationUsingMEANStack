//Import require modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // [Cross Origin Resource Sharing] allows to make request to our apis from differnt domain names.
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database'); // mongodb connection configuration

//Connecting to mongo
//useMongoClient option is set to true inorder to remove the deprecation warning.
mongoose.connect(config.database, { useMongoClient: true });

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});

//In case of DB connection error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Initializing express
const app = express();

const port = 3000;

const users = require('./routes/users');

//Add CORS middleware to express
app.use(cors());

//Body parser middlerware
app.use(bodyParser.json());

//Anything at url <hostname>/users/<Anypath> goes to users file under routes.
app.use('/users', users);

// Set static folder to serve static file for the application
app.use(express.static(path.join(__dirname, 'public')));

//Define a get route for home
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

//Start server listening to the given port
app.listen(port, ()=> {
    console.log('Server started on port ' + port);
});