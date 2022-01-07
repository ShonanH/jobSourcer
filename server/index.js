const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const con = require("./config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

con.connect((err, result) => {
  if (err) console.log("ERROR: ", err);
  app.get("/api/get", (req, res) => {
    let company = req.query.companyName;
    const fetchSelect = "SELECT * FROM samples WHERE Job_Source = ? ";
    con.query(fetchSelect, [company], (err, result) => {
      if (err) console.log("ERROR: ", err);
      console.log(result);
      res.send(result);
    });
  });
});

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
