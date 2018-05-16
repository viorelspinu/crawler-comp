//methods for fetching mysql data
var connection = require('../connection/MySQLConnect');

connection.init();

function Dao() {
  this.getTournamentResultsForPilot = function(req, res) {
    let pilotId = req.query.pilotId;
    connection.acquire(function(err, con) {
      con.query(
        'SELECT t.name, t.points, e.race_index AS raceIndex, e.seconds FROM race_event e, race_event_type t WHERE e.race_event_type_id = t.id AND e.pilot_id=? ORDER BY e.race_index, e.seconds',
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
}

module.exports = new Dao();
