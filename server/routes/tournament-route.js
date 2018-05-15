//custom route for fetching data
var sqlDao = require('../data_access/dao');

module.exports = {
  configure: function(app) {
    const models = app.get('models');

    app.get('/api/tournament/results', function(req, res) {
      sqlDao.getTournamentResultsForPilot(req, res);
    });

    app.get('/api/tournament/:id', function(req, res) {
      //sqlDao.getTournamentById(req, res);

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
      // sqlDao.getAllTournaments(req,res);

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
      // sqlDao.saveTournament(req, res);

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
      //sqlDao.endTournament(req, res);

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
