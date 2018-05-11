//custom route for fetching data
var dao = require('../data_access/dao');

module.exports = {
  configure: function(app) {
    app.get('/api/pilot/:id', function(req, res) {
      dao.getPilotById(req, res);
    });

    app.get('/api/pilot', function(req, res) {
      dao.getAllPilots(res);
    });

    app.get('/api/tournament', function(req, res) {
      dao.getAllTournaments(res);
    });

    app.get('/api/tournament/active', function(req, res) {
      dao.getActiveTournament(res);
    });

    app.get('/api/tournament/results', function(req, res) {
      dao.getTournamentResultsForPilot(req, res);
    });

    app.get('/api/race-event-type', function(req, res) {
      dao.getAllRaceEventTypes(res);
    });

    app.post('/api/tournament', function(req, res) {
      dao.saveTournament(req, res);
    });

    app.post('/api/pilot', function(req, res) {
      dao.savePilot(req, res);
    });

    app.patch('/api/pilot/:id', function(req, res) {
      dao.patchPilot(req, res);
    });

    app.post('/api/race-event', function(req, res) {
      dao.saveRaceEvent(req, res);
    });

    app.post('/api/tournament/end', function(req, res) {
      dao.endTournament(req, res);
    });
  }
};
