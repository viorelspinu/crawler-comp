/**  
 * Creating server using express.js 
 * http://localhost:8000/api/users 
 * http://localhost:8000/api/transactions/1 
*/  
var express = require('express');  
var bodyparser = require('body-parser');  
  
var routes = require('./routes/route');  
  
// creating server instance  
var app = express();  

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// for posting nested object if we have set extended true  
app.use(bodyparser.urlencoded({ extended : true}));  
  
// parsing JSON  
app.use(bodyparser.json());  
  
//set application route with server instance  
routes.configure(app);  
  
// listening application on port 8000  
var server = app.listen(8000, function(){  
    console.log('Server Listening on port ' + server.address().port);  
});  