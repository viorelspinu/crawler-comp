//custom route for fetching data
var sqlDao = require('../data_access/dao');

var models = require('../models');

module.exports = {
  configure: function(app) {
    app.get('/api/pilot/:id', function(req, res) {
      //sqlDao.getPilotById(req, res);
      const id = req.params.id;
      models.Pilot.findById(id).then(pilot => {
        res.send(pilot);
      });
    });

    app.get('/api/pilot', function(req, res) {
      // sqlDao.getAllPilots(req, res);
      const tournamentId = req.query.tournamentId;
      models.Pilot
        .findAll({ where: { tournamentId: tournamentId } })
        .then(pilots => {
          res.send(pilots);
        });
    });

    app.get('/api/tournament/results', function(req, res) {
      sqlDao.getTournamentResultsForPilot(req, res);
    });

    app.get('/api/tournament/:id', function(req, res) {
      sqlDao.getTournamentById(req, res);
    });

    app.get('/api/tournament', function(req, res) {
      sqlDao.getAllTournaments(res);
    });

    app.get('/api/race-event-type', function(req, res) {
      sqlDao.getAllRaceEventTypes(res);
    });

    app.post('/api/tournament', function(req, res) {
      sqlDao.saveTournament(req, res);
    });

    app.post('/api/pilot', function(req, res) {
      sqlDao.savePilot(req, res);
    });

    app.patch('/api/pilot/:id', function(req, res) {
      sqlDao.patchPilot(req, res);
    });

    app.post('/api/race-event', function(req, res) {
      sqlDao.saveRaceEvent(req, res);
    });

    app.post('/api/tournament/end', function(req, res) {
      sqlDao.endTournament(req, res);
    });
  }
};
