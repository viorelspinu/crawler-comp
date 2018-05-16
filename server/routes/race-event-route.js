module.exports = {
  configure: function(app) {
    const models = app.get('models');

    app.get('/api/race-event-type', function(req, res) {
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
