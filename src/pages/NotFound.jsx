import React from "react";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound__container">
      <a className="notfound__link" href="/" target="_self">
        <img className="notfound__img" src="imgs/404.jpg" alt="notfound" />
        돌아가기
      </a>
    </div>
  );
}
