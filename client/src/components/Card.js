import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card--container">
      <img className="card--logo" src={props.logo} alt="Company Logo" />
      <p className="card--description">{props.description}</p>
      <p className="card--rating">{props.rating}</p>
    </div>
  );
};

export default Card;
