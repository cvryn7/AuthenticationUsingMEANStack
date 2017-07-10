//Import require modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // [Cross Origin Resource Sharing] allows to make request to our apis from differnt domain names.
const passport = require('passport');
const mongosse = require('mongoose');

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