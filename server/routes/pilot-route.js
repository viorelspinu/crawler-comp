//custom route for fetching data
var sqlDao = require('../data_access/dao');

module.exports = {
  configure: function(app) {
    const models = app.get('models');

    app.get('/api/pilot/:id', function(req, res) {
      //sqlDao.getPilotById(req, res);

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
      // sqlDao.getAllPilots(req, res);

      models.Pilot
        .findAll({
          include: [
            {
              model: models.Tournament,
              where: { id: req.query.tournamentId }
            }
          ],
          order: [['lastRaceIndex', 'ASC']]
        })
        .then(pilots => {
          res.json(pilots);
        })
        .catch(err => {
          console.log(err);
        });
    });

    app.post('/api/pilot', function(req, res) {
      //sqlDao.savePilot(req, res);

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
      //sqlDao.patchPilot(req, res);

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
