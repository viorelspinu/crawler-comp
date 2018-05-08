//custom route for fetching data
var dao = require('../data_access/dao');

module.exports = {
  configure: function(app) {
    app.get('/api/pilot', function(req, res) {
      dao.getAllPilots(res);
    });

    app.get('/api/tournament', function(req, res) {
      dao.getAllTournaments(res);
    });
    
    app.get('/api/tournament/active', function(req, res) {
      dao.getActiveTournament(res);
    });

    app.post('/api/tournament', function(req, res) {
      dao.saveTournament(req, res);
    });

    app.post('/api/pilot', function(req, res) {
      dao.savePilot(req, res);
    });
  }
};
