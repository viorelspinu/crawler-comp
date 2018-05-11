//methods for fetching mysql data
var connection = require('../connection/MySQLConnect');

connection.init();

function Dao() {
  this.getAllPilots = function(res) {
    connection.acquire(function(err, con) {
      con.query(
        'SELECT id, name, last_race_index as lastRaceIndex FROM pilot',
        function(err, result) {
          con.release();
          res.send(result);
        }
      );
    });
  };

  this.getPilotById = function(req, res) {
    let id = req.params.id;
    connection.acquire(function(err, con) {
      con.query(
        'SELECT id, name, last_race_index as lastRaceIndex FROM pilot WHERE id = ?',
        [id],
        function(err, result) {
          con.release();
          res.send(result);
        }
      );
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

  this.getAllRaceEventTypes = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM race_event_type', function(err, result) {
        con.release();
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
          res.send(result);
        }
      );
    });
  };

  this.getTournamentResultsForPilot = function(req, res) {
    let pilotId = req.query.pilotId;
    connection.acquire(function(err, con) {
      con.query(
        'SELECT t.name, t.points, e.race_index as raceIndex, e.seconds FROM race_event e, race_event_type t WHERE e.race_event_type_id = t.id AND e.pilot_id=? ORDER BY e.race_index',
        [pilotId],
        function(err, result1) {
          con.release();
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
      console.log(tournamentId);

      con.query(
        'INSERT INTO pilot(name, tournament_id, last_race_index) VALUES(?, ?, 0)',
        [name, tournamentId],
        function(err, result) {
          let insertId = result.insertId;
          con.release();
          if (err) throw err;
          res.send(insertId.toString());
        }
      );
    });
  };

  this.patchPilot = function(req, res) {
    let id = req.params.id;
    let lastRaceIndex = req.body.lastRaceIndex;
    connection.acquire(function(err, con) {
      con.query(
        'UPDATE pilot SET last_race_index=? WHERE id = ?',
        [lastRaceIndex, id],
        function(err, result) {
          con.release();
          res.send(result);
        }
      );
    });
  };

  this.saveRaceEvent = function(req, res) {
    connection.acquire(function(err, con) {
      let raceEventTypeId = req.body.raceEventTypeId;
      let pilotId = req.body.pilotId;
      let tournamentId = req.body.tournamentId;
      let raceId = req.body.raceId;
      let seconds = req.body.seconds;

      console.log(raceId);

      con.query(
        'INSERT INTO race_event(race_event_type_id, tournament_id, pilot_id, race_index, seconds) VALUES(?, ?, ?, ?, ?)',
        [raceEventTypeId, tournamentId, pilotId, raceId],
        function(err, result) {
          let insertId = result.insertId;
          con.release();
          if (err) throw err;
          res.send(insertId.toString());
        }
      );
    });
  };
}

module.exports = new Dao();
