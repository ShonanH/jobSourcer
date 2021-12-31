const csvtojson = require("csvtojson");
const con = require("../config");

con.connect((err) => {
  if (err) return console.error("error: " + err.message);

  con.query("DROP TABLE samples", (err, drop) => {
    const createStatament =
      "CREATE TABLE samples(ID INTEGER(2), " +
      "Job_Title VARCHAR(500), Company_Name VARCHAR(500), Job_Url VARCHAR(5000), Job_Source VARCHAR(500))";

    con.query(createStatament, (err, drop) => {
      if (err) console.log("ERROR: ", err);
    });
  });
});

// CSV file name
const fileName = "../job_opportunities.csv";

csvtojson()
  .fromFile(fileName)
  .then((source) => {
    // Fetching the data from each row
    // and inserting to the table "sample"
    for (let i = 0; i < source.length; i++) {
      var JobId = source[i]["ID (primary key)"],
        JobTitle = source[i]["Job Title"],
        CompanyName = source[i]["Company Name"],
        JobUrl = source[i]["Job URL"];

      let JobSource = "";
      let insertStatement = "INSERT INTO samples values(?, ?, ?, ?, ?)";
      let items = [JobId, JobTitle, CompanyName, JobUrl, JobSource];

      // Inserting data of current row
      // into database
      con.query(insertStatement, items, (err, results, fields) => {
        if (err) {
          console.log("Unable to insert item at row ", i + 1);
          return console.log(err);
        }
      });
    }
    console.log("All items stored into database successfully");
  });
