import React from "react";
import { Link } from "react-router-dom";
import Card from "./components/Card";
import jobBoards from "./jobBoards.json";

import "./App.css";

function App() {
  const jobData = jobBoards.job_boards;
  // console.log(jobData);

  return (
    <div className="App">
      <div className="job--source--container">
        <h1>Job Source Resolver</h1>
        <div className="job--cards--container">
          <section className="job--cards">
            {jobData.map((data, i) => {
              return (
                <Link
                  key={i}
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/details", state: { name: data.name } }}
                >
                  <Card
                    description={data.description}
                    logo={data.logo_file}
                    rating={data.rating}
                  />
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
