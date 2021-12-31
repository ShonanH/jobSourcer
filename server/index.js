const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const con = require("./config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

con.connect((err, result) => {
  app.get("/api/get", (req, res) => {
    const fetchSelect = "SELECT * FROM samples ORDER BY ID asc";
    con.query(fetchSelect, (err, result) => {
      if (err) console.log("ERROR: ", err);
      res.send(result);
    });
  });
});

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
