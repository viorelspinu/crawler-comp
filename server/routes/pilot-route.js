module.exports = {
  configure: function(app) {
    const models = app.get('models');

    app.get('/api/pilot/:id', function(req, res) {
      models.Pilot
        .findById(req.params.id)
        .then(pilot => {
          res.json(pilot);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.get('/api/pilot', function(req, res) {
      models.Pilot
        .findAll({
          where: { tournamentId: req.query.tournamentId },
          order: [['lastRaceIndex', 'ASC']]
        })
        .then(pilots => {
          const selectRacePromises = pilots.map(pilot => {
            return models.Race.findOne({
              where: { pilotId: pilot.id },
              order: [['points', 'ASC']]
            });
          });

          models.sequelize.Promise.all(selectRacePromises).then(races => {
            races.map(race => {
              var pilot = pilots.find(p => {
                return p.id === race.pilotId;
              });
              pilot.dataValues.bestScore = race.points;
            });

            res.json(pilots);
          });
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/pilot', function(req, res) {
      const pilot = models.Pilot
        .create({
          name: req.body.pilotName,
          lastRaceIndex: 0,
          tournamentId: req.body.tournamentId
        })
        .then(pilot => {
          res.json(pilot.id);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.patch('/api/pilot/:id', function(req, res) {
      models.Pilot
        .update(
          { lastRaceIndex: req.body.lastRaceIndex },
          {
            where: {
              id: req.params.id
            }
          }
        )
        .then(p => {
          res.json(p.id);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
