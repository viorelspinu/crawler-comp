//custom route for fetching data
var sqlDao = require('../data_access/dao');
var models = require('../models');

module.exports = {
  configure: function(app) {
    app.get('/api/race-event-type', function(req, res) {
      //sqlDao.getAllRaceEventTypes(res);

      models.RaceEventType
        .findAll()
        .then(t => {
          res.json(t);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/race-event', function(req, res) {
      //sqlDao.saveRaceEvent(req, res);

      const raceEvent = models.RaceEvent
        .create({
          raceEventTypeId: req.body.raceEventTypeId,
          pilotId: req.body.pilotId,
          tournamentId: req.body.tournamentId,
          raceId: req.body.raceId,
          seconds: req.body.seconds,
          raceIndex: req.body.raceId
        })
        .then(raceEvent => {
          res.json(raceEvent.id);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
