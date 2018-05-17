module.exports = {
  configure: function(app) {
    const models = app.get('models');

    app.get('/api/tournament/results', function(req, res) {
      const pilotId = +req.query.pilotId;

      const promise1 = models.sequelize.query(
        'SELECT t.name, t.points, e.race_index AS raceIndex, e.seconds FROM race_event e, race_event_type t WHERE e.race_event_type_id = t.id AND e.pilot_id=:pilotId ORDER BY e.race_index, e.seconds',
        {
          replacements: { pilotId: pilotId },
          type: models.sequelize.QueryTypes.SELECT
        }
      );

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
        let returnObj = new Object();
        returnObj.pilotId = pilotId;
        returnObj.raceEvents = result1;

        result2.pilotId = pilotId;
        returnObj.raceTotals = result2;

        console.log(result3);

        returnObj.bestRaceIndex = result3.index;
        returnObj.bestRacePoints = result3.points;

        res.send(returnObj);
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
