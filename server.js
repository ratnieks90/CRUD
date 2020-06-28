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

// Root endpoint for public part
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Other API endpoints
app.use('/api', employeesRoutes)

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});

// Server port
const HTTP_PORT = 3000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});