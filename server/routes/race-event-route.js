module.exports = {
  configure: function (app) {
    const models = app.get('models');

    app.get('/api/race-event-type', function (req, res) {
      models.RaceEventType
        .findAll()
        .then(t => {
          res.json(t);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/race-event', function (req, res) {
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
        }).then(function () {
          models.RaceEvent.find({
            attributes: [
              [models.sequelize.fn('SUM', models.sequelize.col('RaceEventType.points')), 'totalPoints']
            ],
            where: {
              raceIndex: req.body.raceId,
              pilotId: req.body.pilotId
            },
            include: [models.RaceEventType]
          }).then(rows => {
            const totalPoints = rows.dataValues.totalPoints;
            models.Race.find(
              {
                where: {
                  index: req.body.raceId,
                  pilotId: req.body.pilotId
                }
              }).then(race => {
                race.duration = req.body.seconds;
                race.points = totalPoints;
                console.log(race.dataValues.id);
                race.save().then(() => {
                  console.log('saved');
                }).catch(error => {
                  console.log(error);
                });
              });
          });

        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
