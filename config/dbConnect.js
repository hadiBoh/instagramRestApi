const mysql = require('mysql')

const db = mysql.createConnection({
    port:process.env.DB,
    host:process.env.HOST,
    user:"root",
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})


db.connect(function(err) {
    if (err) throw err
    console.log("Connected!");
    var sql3 = "CREATE TABLE IF NOT EXISTS users (userId VARCHAR(128), username VARCHAR(128) UNIQUE, password VARCHAR(128) , bio VARCHAR(128) ,profile VARCHAR(128) )";
    db.query(sql3, function (err, result) {
      if (err) throw err;
    });
    var sql = "CREATE TABLE IF NOT EXISTS posts (postId INTEGER(11), userId VARCHAR(128), caption VARCHAR(128) ,img VARCHAR(128) , date VARCHAR(128) , PRIMARY KEY (postId) )";
    db.query(sql, function (err, result) {
      if (err) throw err;
    }); 
    var sql1 = "CREATE TABLE IF NOT EXISTS comments (commentId INTEGER(11), postId VARCHAR(128), userId VARCHAR(128) ,date VARCHAR(128) ,PRIMARY KEY (commentId))";
    db.query(sql1, function (err, result) {
      if (err) throw err;
    }); 
    var sql2 = "CREATE TABLE IF NOT EXISTS likes (id INTEGER(11), userId VARCHAR(128), postId VARCHAR(128) ,PRIMARY KEY (id))";
    db.query(sql2, function (err, result) {
      if (err) throw err;
    }); 
  });


module.exports = db