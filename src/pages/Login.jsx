import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

// InputField Component
const InputField = ({ title, type, placeholder, value, onChange }) => (
  <div>
    <p className="login__input__title">{title}</p>
    <input
      className={`login__input__${type}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`${placeholder}`}
    />
  </div>
);

// Login Page Component
export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const handleRegisterBtnClick = () => {
    navigate("/register");
    window.scrollTo(0, 0);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitHandler = async () => {
    try {
      const response = await axios.post(
        "https://searcheshouse.net/api/member/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.headers.authorization);
      setCookie("token", response.headers.authorization, { secure: true });
      console.log(cookies);
      alert("로그인이 정상적으로 되었습니다");
      navigate("/");
      return response;
    } catch (error) {
      alert("로그인이 정상적으로 되지 않았습니다", error);
    }
  };

  return (
    <div className="login__section">
      <div className="login__container">
        <div>
          <p className="login__title">로그인</p>
          <p>로그인을 위하여 아이디와 비밀번호를 입력해주세요.</p>
        </div>
        <img className="login__logo" src="imgs/house.png" alt="logo" />
      </div>
      <div className="login__components__container">
        <div>
          <InputField
            title="아이디"
            type="email"
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
          />
          <InputField
            title="비밀번호"
            type="email"
            placeholder="email"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="login__btn__container">
          <button
            onClick={handleRegisterBtnClick}
            className="login__btn__cancel"
          >
            회원가입
          </button>
          <button className="login__btn__signup" onClick={onSubmitHandler}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
