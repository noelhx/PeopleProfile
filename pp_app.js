var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/')));   // Use this directory (C://PeopleProfile/)

var server = app.listen(8888, function () {
    console.log('People Profile test application is running on http://localhost:8888... (10.91.160.56:8888)');
});

// Routes defined here...

/* Homepage */
app.get('/', function (req, res)
{
  return res.sendFile('C://PeopleProfile/index.html');
});
