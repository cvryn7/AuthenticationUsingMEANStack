const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // [Cross Origin Resource Sharing] allows to make request to our apis from differnt domain names.
const passport = require('passport');
const mongosse = require('mongoose');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(port, ()=> {
    console.log('Server started on port ' + port);
});