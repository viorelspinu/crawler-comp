var express = require('express');
var bodyparser = require('body-parser');

var pilotRoutes = require('./routes/pilot-route');
var tournamentRoutes = require('./routes/tournament-route');
var raceEventRoutes = require('./routes/race-event-route');

var app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.set('models', require('./models'));

pilotRoutes.configure(app);
tournamentRoutes.configure(app);
raceEventRoutes.configure(app);

var server = app.listen(8000, function() {
  console.log('Server Listening on port ' + server.address().port);
});
