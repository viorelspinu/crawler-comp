//custom route for fetching data
var sqlDao = require('../data_access/dao');
var models = require('../models');

module.exports = {
  configure: function(app) {
    app.get('/api/race-event-type', function(req, res) {
      sqlDao.getAllRaceEventTypes(res);
    });

    app.post('/api/race-event', function(req, res) {
      sqlDao.saveRaceEvent(req, res);
    });
  }
};
