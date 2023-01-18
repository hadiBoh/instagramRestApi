const mysql = require('mysql')

const db = mysql.createConnection({
    port:process.env.PORT,
    host:process.env.HOST,
    user:"root",
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})


db.connect(function(err) {
    if (err) throw err
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS posts (postId INTEGER(11), userId VARCHAR(767), caption VARCHAR(767) ,img VARCHAR(767) , date VARCHAR(767) , PRIMARY KEY (postId) )";
    db.query(sql, function (err, result) {
      if (err) throw err;
    }); 
    var sql1 = "CREATE TABLE IF NOT EXISTS comments (commentId INTEGER(11), postId VARCHAR(767), userId VARCHAR(767) ,date VARCHAR(767) ,PRIMARY KEY (commentId))";
    db.query(sql1, function (err, result) {
      if (err) throw err;
    }); 
    var sql2 = "CREATE TABLE IF NOT EXISTS likes (id INTEGER(11), userId VARCHAR(767), postId VARCHAR(767) ,PRIMARY KEY (id))";
    db.query(sql2, function (err, result) {
      if (err) throw err;
    }); 
    var sql3 = "CREATE TABLE IF NOT EXISTS users (userId VARCHAR(767), username VARCHAR(767), password VARCHAR(767) , bio VARCHAR(767) ,img VARCHAR(767) )";
    db.query(sql3, function (err, result) {
      if (err) throw err;
    });
  });


module.exports = db