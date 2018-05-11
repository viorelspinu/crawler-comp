//methods for fetching mysql data
var connection = require('../connection/MySQLConnect');

connection.init();

function Dao() {
  this.getAllPilots = function(req, res) {
    connection.acquire(function(err, con) {
      let tournamentId = req.query.tournamentId;
      con.query(
        'SELECT id, name, last_race_index as lastRaceIndex FROM pilot WHERE tournament_id = ? SORT BY last_race_index ASC',
        [tournamentId],
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

  this.getTournamentById = function(req, res) {
    let id = req.params.id;
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM tournament WHERE id = ?', [id], function(
        err,
        result
      ) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getTournamentResultsForPilot = function(req, res) {
    let pilotId = req.query.pilotId;
    console.log(pilotId);
    connection.acquire(function(err, con) {
      con.query(
        'SELECT t.name, t.points, e.race_index AS raceIndex, e.seconds FROM race_event e, race_event_type t WHERE e.race_event_type_id = t.id AND e.pilot_id=? ORDER BY e.race_index',
        [pilotId],
        function(err1, result1) {
          con.query(
            'SELECT SUM(t.points) as totalPoints, e.race_index AS raceIndex FROM race_event e, race_event_type t WHERE (e.race_event_type_id=t.id) AND (pilot_id=?) GROUP BY race_index ORDER BY race_index',
            [pilotId],
            function(err2, result2) {
              con.query(
                'SELECT MIN(totalPoints) AS bestPoints, races.race_index AS ind FROM (SELECT SUM(t.points) as totalPoints, e.race_index FROM race_event e, race_event_type t WHERE (e.race_event_type_id=t.id) AND (pilot_id=?) GROUP BY race_index ORDER BY race_index) as races',
                [pilotId],
                function(err3, result3) {
                  con.release();

                  let returnObj = new Object();
                  returnObj.pilotId = pilotId;
                  returnObj.raceEvents = result1;
                  result2.pilotId = pilotId;
                  returnObj.raceTotals = result2;

                  returnObj.bestRaceIndex = result3[0].ind;
                  returnObj.bestRacePoints = result3[0].bestPoints;

                  res.send(returnObj);
                }
              );
            }
          );
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

  this.endTournament = function(req, res) {
    let id = req.body.tournamentId;
    connection.acquire(function(err, con) {
      con.query('UPDATE tournament SET finished=1 WHERE id = ?', [id], function(
        err,
        result
      ) {
        con.release();
        res.send(result);
      });
    });
  };

  this.saveRaceEvent = function(req, res) {
    connection.acquire(function(err, con) {
      let raceEventTypeId = req.body.raceEventTypeId;
      let pilotId = req.body.pilotId;
      let tournamentId = req.body.tournamentId;
      let raceId = req.body.raceId;
      let seconds = req.body.seconds;

      console.log(seconds);

      con.query(
        'INSERT INTO race_event(race_event_type_id, tournament_id, pilot_id, race_index, seconds) VALUES(?, ?, ?, ?, ?)',
        [raceEventTypeId, tournamentId, pilotId, raceId, seconds],
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
