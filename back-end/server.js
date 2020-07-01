// Create express app
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
//adding api employees routes
const employeesRoutes = require('./routes/employees');
//create database
require('./database/config').init();

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//API endpoints
app.use('/api', employeesRoutes)
//make js, img and css files available vie root route
app.use('/dist', express.static(path.join(__dirname, '../public/dist')));
app.use('/styles', express.static(path.join(__dirname, '../public/styles')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
//move all requests to index.html
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on http://localhost:%PORT%/".replace("%PORT%", HTTP_PORT))
});