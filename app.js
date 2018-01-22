var express = require('express');
var app = express();

app.use('/', express.static(__dirname +'/browser-client/build/')); //serves the index.html

module.exports = app;
