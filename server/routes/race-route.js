module.exports = {
  configure: function (app) {
    const models = app.get('models');

    app.get('/api/race', function (req, res) {
      models.Race
        .findAll({
          where: { pilotId: req.query.pilotId },
          order: [['index', 'ASC']]
        })
        .then(races => {
          res.json(races);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/race', function (req, res) {
      models.sequelize.transaction(t => {
        const pilotUpdatePromise = models.Pilot
          .update(
            { lastRaceIndex: req.body.index },
            {
              where: {
                id: req.body.pilotId
              }
            }, { transaction: t });

        const raceCreatePromise = models.Race
          .create({
            duration: 0,
            points: 0,
            index: req.body.index,
            finished: 0,
            tournamentId: req.body.tournamentId,
            pilotId: req.body.pilotId
          }, { transaction: t });

        return models.sequelize.Promise
          .join(pilotUpdatePromise, raceCreatePromise);

      }).spread((resPilot, resRace) => {
        res.json(resRace.id);
      }).catch(function (err) {
        console.log(err);
      });

    });

    app.patch('/api/race/:id', function (req, res) {
      models.Race
        .update(
          {
            duration: req.body.duration,
            points: req.body.points,
            finished: 1
          },
          {
            where: {
              id: req.params.id
            }
          }
        )
        .then(race => {
          res.json(race.id);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
