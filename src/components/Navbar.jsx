import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar__header">
      <Link to="/" className="navbar__title">
        <img className="navbar__logo" src="imgs/house.png" alt="logo" />
        <h1>이조의집</h1>
      </Link>
      <nav className="navbar__nav">
        <Link to="/login" className="navbar__btn">
          로그인
        </Link>
        <Link to="/register" className="navbar__btn">
          회원가입
        </Link>
        <Link to="/post" className="navbar__btn">
          글쓰기
        </Link>
      </nav>
    </header>
  );
}
