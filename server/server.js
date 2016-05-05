// Testing
//Creating an sqlite3 database with node.js
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
db.serialize(function() {
  db.run("CREATE TABLE user( id INT, dt TEXT)");
  var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
  for(var i = 0; i < 10; i++){
    var d = new Date();
    var n = d.toLocaleTimeString();
    stmt.run(i,n);
  }
  stmt.finalize();
  db.each("SELECT id, dt FROM user", function(err,row){
    if(err){
      console.log("there was an error");
    }
    else{
      console.log("User id : " + row.id, row.dt);
    }
  });
});

db.close();
