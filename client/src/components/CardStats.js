import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardStats.css";

const CardStats = (props) => {
  const [allCompanies, setAllCompanies] = useState([]);
  const companyName = props.location.state.name;

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((res) => {
      const result = res.data;
      const filterRes = result.filter(
        ({ Job_Source }) => Job_Source === companyName
      );
      setAllCompanies(filterRes);
    });
  }, []);

  return (
    <div className="stats--container">
      <h1>Job Source: {companyName}</h1>
      <table className="results--table">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Job URL</th>
          </tr>
          {allCompanies.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.ID}</td>
                <td>{item.Company_Name}</td>
                <td>{item.Job_Title}</td>
                <td>{item.Job_Url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CardStats;
