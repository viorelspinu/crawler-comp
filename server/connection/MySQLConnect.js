// establish Mysql Connection  
var mysql = require('mysql');  

function MySQLConnect() {  

this.pool = null;  
  

this.init = function() {  
  this.pool = mysql.createPool({  
    connectionLimit: 10,  
    host     : process.env.DB_URL,  
    user     : process.env.DB_USER,  
    password : process.env.DB_PASSWORD,  
    database: process.env.DB_NAME  
  });  
};  

console.log("session secret is:", );

// acquire connection and execute query on callbacks  
this.acquire = function(callback) { 
  this.pool.getConnection(function(err, connection) {  
    callback(err, connection); 
  });  

};  

}  

module.exports = new MySQLConnect();  