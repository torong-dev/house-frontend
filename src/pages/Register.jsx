import React from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// InputField Component
const InputField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage,
}) => (
  <div>
    <p className="register__input__title">{title}</p>
    <input
      className={`register__input__${type} ${isValid ? "" : "invalid"}`}
      type={type === "password" ? "password" : "email"}
      value={value}
      onChange={onChange}
    />
    {!isValid && <p className="error-message">{errorMessage}</p>}
  </div>
);

// Register Page Component
export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [emailValid, setemailValid] = useState("");
  const [passwordlValid, setpasswordValid] = useState("");
  const [phoneNumberValid, setphoneNumberValid] = useState("");
  const [userNameValid, setuserNameValid] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setusername(e.target.value);
    validateUsername(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    validatePhoneNumber(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //유효성 검사 식
    setemailValid(regex.test(value));
  };

  const validatePassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':",./<>?]).{5,15}$/;
    setpasswordValid(regex.test(value));
  };

  const validatePhoneNumber = (value) => {
    const regex = /^\d{10,11}$/;
    setphoneNumberValid(regex.test(value));
  };

  const validateUsername = (value) => {
    setuserNameValid(value.trim() !== "");
  };

  const handleCancelBtnClick = () => {
    navigate("/login");
    window.scrollTo(0, 0);
  };

  // 전송 되야하는 형식
  // //   "email":"user1@user.com",
  //   "password":"user1@1234",
  //   "username" :  "user1",
  //   "phoneNumber" : "010-1234-1234",
  //   "address" : "user1home"

  const handleAddBtnClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/member/signup`,
        {
          email: email,
          password: password,
          username: username,
          phoneNumber: phoneNumber,
          address: address,
        }
      );
      console.log(response.headers);
      alert("회원가입이 완료 되었습니다");
      navigate("/login");
      return response;
    } catch (error) {
      alert("회원가입이 완료 되지 않았습니다.", error);
    }
  };

  return (
    <div className="register__section">
      <div className="register__container">
        <div>
          <p className="register__title">회원가입</p>
          <p>회원가입을 위하여 아이디와 비밀번호를 입력해주세요.</p>
        </div>
        <img className="register__logo" src="imgs/house.png" alt="logo" />
      </div>
      <div className="register__components__container">
        <div>
          <InputField
            title="아이디"
            type="email"
            value={email}
            isValid={emailValid}
            onChange={handleEmailChange}
            errorMessage="올바른 이메일 형식이어야 합니다."
          />
          <InputField
            title="비밀번호"
            type="email"
            value={password}
            isValid={passwordlValid}
            onChange={handlePasswordChange}
            errorMessage="최소 5자 이상, 15자 이하의 대소문자, 숫자, 특수문자를 포함해야 합니다."
          />
          <InputField
            title="닉네임"
            type="email"
            placeholder="nickname"
            value={username}
            isValid={userNameValid}
            onChange={handleUsernameChange}
            errorMessage="이름은 필수 입력 항목입니다."
          />
          <InputField
            title="휴대전화 번호"
            type="phone-number"
            placeholder="phone number"
            value={phoneNumber}
            isValid={phoneNumberValid}
            onChange={handlePhoneNumberChange}
            errorMessage="올바른 휴대전화 번호 형식이어야 합니다."
          />
          <InputField
            title="주소"
            type="address"
            placeholder="address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="register__btn__container">
          <button
            onClick={handleCancelBtnClick}
            className="register__btn__cancel"
          >
            가입취소
          </button>
          <button className="register__btn__signup" onClick={handleAddBtnClick}>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
