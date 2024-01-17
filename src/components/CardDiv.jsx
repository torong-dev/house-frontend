import React from "react";
import "../styles/CardDiv.css";

function CardDiv(props) {
  return (
    <div className="card">
      <div className="poster">
        <div className="image-container">
          <img src={props.img} alt="" />
        </div>
        <div className="overlay">
          <p className="info">제품:</p>
          <p className="vote">조회수</p>
        </div>
      </div>
    </div>
  );
}

export default CardDiv;
