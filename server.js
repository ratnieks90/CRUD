// Create express app
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
//adding api employees routes
const employeesRoutes = require('./routes/employees');
//create database
require('./database').init();

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// static pages from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Other API endpoints
app.use('/api', employeesRoutes)

app.get('*', function(req, res){
    res.status(404).send('endpoint not found');
});

// Server port
const HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});