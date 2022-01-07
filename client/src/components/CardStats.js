import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardStats.css";

const CardStats = (props) => {
  const [allCompanies, setAllCompanies] = useState([]);
  const companyName = props.location.state.name;

  useEffect(() => {
    axios
      .get(
        `https://pathrise-jobsourcer.herokuapp.com/api/get?companyName=${companyName}`
      )
      .then((res) => {
        const result = res.data;
        setAllCompanies(result);
      });
  }, [companyName]);

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
