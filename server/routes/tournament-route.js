//custom route for fetching data
var sqlDao = require('../data_access/dao');
var models = require('../models');

module.exports = {
  configure: function(app) {
    app.get('/api/tournament/results', function(req, res) {
      sqlDao.getTournamentResultsForPilot(req, res);
    });

    app.get('/api/tournament/:id', function(req, res) {
      sqlDao.getTournamentById(req, res);
    });

    app.get('/api/tournament', function(req, res) {
      sqlDao.getAllTournaments(res);
    });

    app.post('/api/tournament', function(req, res) {
      sqlDao.saveTournament(req, res);
    });

    app.post('/api/tournament/end', function(req, res) {
      sqlDao.endTournament(req, res);
    });
  }
};
