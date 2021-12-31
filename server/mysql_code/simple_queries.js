const jsonData = require("../jobBoards.json");
const con = require("../config");

con.connect((err) => {
  if (err) return console.error("error: " + err.message);

  let fetchURL = "SELECT ID, Company_Name, Job_Url FROM samples";
  con.query(fetchURL, (err, result, fields) => {
    if (err) console.log("ERROR IN FETCHING JOB_URL", err);
    const data = jsonData.job_boards;
    const jobStore = {};
    data.map((element) => {
      let domainName = element.root_domain;
      let platformName = element.name;
      if (jobStore.hasOwnProperty(domainName)) {
        return;
      } else {
        jobStore[domainName] = platformName;
      }
    });

    Object.keys(result).forEach(function (key) {
      const row = result[key];
      if (row.Job_Url) {
        if (!(row.Company_Name === "Unknown")) {
          try {
            let urlDomain = new URL(row.Job_Url);
            urlDomain = urlDomain.hostname
              .split(".")
              .reverse()
              .splice(0, 2)
              .reverse()
              .join(".");
            let companyNameFromDomain = new URL(row.Job_Url);
            companyNameFromDomain = companyNameFromDomain.hostname
              .split(".")
              .splice(0, 3)
              .join("");
            if (jobStore.hasOwnProperty(urlDomain)) {
              let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
              const updateData = [jobStore[urlDomain], row.ID];
              con.query(updating, updateData, (err, result, fields) => {
                if (err) console.log("UPDATING ERROR", err);
                console.log("UPDATE Complete", result);
              });
            } else if (
              companyNameFromDomain
                .toLowerCase()
                .includes(row.Company_Name.toLowerCase().split(" ").join(""))
            ) {
              let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
              const updateData = ["Company Website", row.ID];
              con.query(updating, updateData, (err, result, fields) => {
                if (err) console.log("UPDATING ERROR", err);
                console.log("UPDATE Complete", result);
              });
            } else {
              let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
              const updateData = ["Unknown", row.ID];
              con.query(updating, updateData, (err, result, fields) => {
                if (err) console.log("UPDATING ERROR", err);
                console.log("UPDATE Complete", result);
              });
            }
          } catch (e) {
            if (e instanceof TypeError) {
              if (e.code === "ERR_INVALID_URL") {
                let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
                const updateData = ["URL Invalid", row.ID];
                con.query(updating, updateData, (err, result, fields) => {
                  if (err) console.log("UPDATING ERROR", err);
                  console.log("UPDATE Complete", result);
                });
              }
            }
          }
        } else {
          try {
            let urlDomain = new URL(row.Job_Url);
            urlDomain = urlDomain.hostname
              .split(".")
              .reverse()
              .splice(0, 2)
              .reverse()
              .join(".");
            if (jobStore.hasOwnProperty(urlDomain)) {
              let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
              const updateData = [jobStore[urlDomain], row.ID];
              con.query(updating, updateData, (err, result, fields) => {
                if (err) console.log("UPDATING ERROR", err);
                console.log("UPDATE Complete", result);
              });
            } else {
              let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
              const updateData = ["Unknown", row.ID];
              con.query(updating, updateData, (err, result, fields) => {
                if (err) console.log("UPDATING ERROR", err);
                console.log("UPDATE Complete", result);
              });
            }
          } catch (e) {
            if (e instanceof TypeError) {
              if (e.code === "ERR_INVALID_URL") {
                let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
                const updateData = ["URL Invalid", row.ID];
                con.query(updating, updateData, (err, result, fields) => {
                  if (err) console.log("UPDATING ERROR", err);
                  console.log("UPDATE Complete", result);
                });
              }
            }
          }
        }
      } else {
        let updating = "UPDATE samples SET Job_Source = ? WHERE ID = ?";
        const updateData = ["Unknown", row.ID];
        con.query(updating, updateData, (err, result, fields) => {
          if (err) console.log("UPDATING ERROR", err);
          console.log("UPDATE Complete", result);
        });
      }
    });
  });
});
