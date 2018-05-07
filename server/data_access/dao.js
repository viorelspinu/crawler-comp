//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect');  

function Dao() { 


  this.getAllPilots = function (res) {  
      // initialize database connection  
      connection.init();  
      // calling acquire methods and passing callback method that will be execute query  
      // return response to server   
      connection.acquire(function (err, con) {  
          con.query('SELECT * FROM pilot', function (err, result) {  
              con.release();  
              res.send(result);  
          });  
      });  
  };  

  this.getAllTournaments = function (res) {  
    // initialize database connection  
    connection.init();  
    // calling acquire methods and passing callback method that will be execute query  
    // return response to server   
    connection.acquire(function (err, con) {  
        con.query('SELECT * FROM tournament', function (err, result) {  
            con.release();
            res.send(result);  
        });  
    });  
};  

}  

module.exports = new Dao();  