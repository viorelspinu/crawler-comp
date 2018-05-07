//custom route for fetching data  
var dao = require('../data_access/dao');  
  
module.exports = {  
    //set up route configuration that will be handle by express server  
    configure: function (app) {  
  
        // adding route for users, here app is express instance which provide use  
        // get method for handling get request from http server.   
        app.get('/api/pilot', function (req, res) {  
            dao.getAllPilots(res);  
        });  

  
    }  
};  