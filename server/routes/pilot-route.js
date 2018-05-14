//custom route for fetching data
var sqlDao = require('../data_access/dao');
var models = require('../models');

module.exports = {
  configure: function(app) {
    app.get('/api/pilot/:id', function(req, res) {
      //sqlDao.getPilotById(req, res);
      const id = req.params.id;
      models.Pilot
        .findById(id)
        .then(pilot => {
          res.send(pilot);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.get('/api/pilot', function(req, res) {
      // sqlDao.getAllPilots(req, res);
      const tournamentId = req.query.tournamentId;
      models.Pilot
        .findAll({ where: { tournamentId: tournamentId } })
        .then(pilots => {
          res.send(pilots);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/pilot', function(req, res) {
      //sqlDao.savePilot(req, res);
      let name = req.body.pilotName;
      let tournamentId = req.body.tournamentId;

      const pilot = models.Pilot
        .create({
          name: name,
          lastRaceIndex: 0,
          tournamentId: tournamentId
        })
        .then(pilot => {
          res.send(pilot.id);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.patch('/api/pilot/:id', function(req, res) {
      //sqlDao.patchPilot(req, res);
      const id = req.params.id;
      let lastRaceIndex = req.body.lastRaceIndex;
      models.Pilot.update(
        { lastRaceIndex: lastRaceIndex },
        {
          where: {
            id: id
          }
        }
      );
    });
  }
};
