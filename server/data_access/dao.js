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

  this.getTournamentById = function(res) {
    let id = req.body.id;
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM tournament WHERE id = ?', [id], function(
        err,
        result
      ) {
        con.release();
        console.log(result);
        res.send(result);
      });
    });
  };

  this.getAllTournaments = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM tournament', function(err, result) {
        con.release();
        console.log(result);
        res.send(result);
      });
    });
  };

  this.getActiveTournament = function(res) {
    connection.acquire(function(err, con) {
      con.query(
        'SELECT * FROM tournament WHERE finished=FALSE LIMIT 1',
        function(err, result) {
          con.release();
          console.log(result);
          res.send(result);
        }
      );
    });
  };

  this.saveTournament = function(req, res) {
    connection.acquire(function(err, con) {
      let name = req.body.tournamentName;
      let finished = false;

      con.query(
        'INSERT INTO tournament(name, finished, create_date) VALUES(?, ?, NOW())',
        [name, finished],
        function(err, result) {
          let insertId = result.insertId;
          console.log(insertId);
          con.release();
          if (err) throw err;
          res.send(insertId.toString());
        }
      );
    });
  };

  this.savePilot = function(req, res) {
    connection.acquire(function(err, con) {
      let name = req.body.pilotName;
      let tournamentId = req.body.tournamentId;

      con.query(
        'INSERT INTO pilot(name, tournament_id) VALUES(?, ?)',
        [name, tournamentId],
        function(err, result) {
          let insertId = result.insertId;
          console.log(insertId);
          con.release();
          if (err) throw err;
          res.send(insertId.toString());
        }
      );
    });
  };
}

module.exports = new Dao();
