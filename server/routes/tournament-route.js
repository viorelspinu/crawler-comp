module.exports = {
  configure: function(app) {
    const models = app.get('models');

    app.get('/api/tournament/results', function(req, res) {
      const pilotId = +req.query.pilotId;

      const promise1 = models.RaceEvent.findAll({
        where: { pilotId: pilotId },
        include: [models.RaceEventType],
        order: [['raceIndex', 'ASC'], ['seconds', 'ASC']]
      });

      const promise2 = models.Race.findAll({
        where: { pilotId: pilotId },
        order: [['index', 'ASC']]
      });

      const promise3 = models.Race.findOne({
        where: { pilotId: pilotId },
        order: [['points', 'ASC']]
      });

      models.sequelize.Promise.join(promise1, promise2, promise3, function(
        result1,
        result2,
        result3
      ) {
        let rawResults = [];

        result1.forEach(item => {
          let rawResult = new Object();

          rawResult.name = item.RaceEventType.name;
          rawResult.points = item.RaceEventType.points;
          rawResult.raceIndex = item.dataValues.raceIndex;
          rawResult.seconds = item.dataValues.seconds;

          rawResults.push(rawResult);
        });

        let returnObj = new Object();
        returnObj.pilotId = pilotId;
        returnObj.raceEvents = rawResults;

        result2.pilotId = pilotId;
        returnObj.raceTotals = result2;

        returnObj.bestRaceIndex = result3.index;
        returnObj.bestRacePoints = result3.points;

        res.json(returnObj);
      });
    });

    app.get('/api/tournament/:id', function(req, res) {
      models.Tournament
        .findById(req.params.id)
        .then(t => {
          res.json(t);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.get('/api/tournament', function(req, res) {
      models.Tournament
        .findAll({
          order: [['createDate', 'ASC']]
        })
        .then(t => {
          res.json(t);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/tournament', function(req, res) {
      const tournament = models.Tournament
        .create({
          name: req.body.tournamentName,
          finished: false
        })
        .then(t => {
          res.json(t.id);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/tournament/end', function(req, res) {
      models.Tournament
        .update(
          { finished: true },
          {
            where: {
              id: req.body.tournamentId
            }
          }
        )
        .then(t => {
          res.json(t.id);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
