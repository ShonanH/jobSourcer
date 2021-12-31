const mysql = require("mysql2");

const hostname = "us-cdbr-east-05.cleardb.net",
  username = "b56f27c18d4817",
  password = "8b882a97",
  databsename = "heroku_dab2d5989a86aec";

// const hostname = "localhost",
//   username = "root",
//   password = "test2022",
//   databsename = "csvtomysql";

const con = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: databsename,
});

module.exports = con;
