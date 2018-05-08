//methods for fetching mysql data
var connection = require('../connection/MySQLConnect');

connection.init();

function Dao() {
  this.getAllPilots = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM pilot', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getAllTournaments = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM tournament', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.saveTournament = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM tournament LIMIT 1', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
}

module.exports = new Dao();
