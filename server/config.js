const mysql = require("mysql2");

const hostname = "us-cdbr-east-05.cleardb.net",
  username = "bbbc6a0d71817e",
  password = "7bbc0ca9",
  databsename = "heroku_c3d3256ff68db8a";

const con = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: databsename,
});

module.exports = con;
