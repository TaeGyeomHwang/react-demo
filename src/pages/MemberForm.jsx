import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { SIGN_UP_API } from "../../constants/api_constants";
import { LOGIN } from "../../constants/page_constants";
import CSRFToken from "../../csrftoken";

export default function MemberForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const member = {
        name: name,
        email: email,
        password: password,
        address: address,
      };

      const response = await axios.post(API_BASE_URL + SIGN_UP_API, member, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest', // X-Requested-With 헤더 추가
          'X-CSRF-TOKEN': <CSRFToken/>,
        },
      });

      console.log(response.data);

      navigate(LOGIN);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="이름을 입력해주세요"
            />
          </div>
          {/* Display error message for name field */}
          {errorMessage && errorMessage.field === "name" && (
            <p className="fieldError">{errorMessage.message}</p>
          )}
          <div className="form-group">
            <label htmlFor="email">이메일주소</label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
            />
          </div>
          {/* Display error message for email field */}
          {errorMessage && errorMessage.field === "email" && (
            <p className="fieldError">{errorMessage.message}</p>
          )}
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="비밀번호 입력"
            />
          </div>
          {/* Display error message for email field */}
          {errorMessage && errorMessage.field === "password" && (
            <p className="fieldError">{errorMessage.message}</p>
          )}
          <div className="form-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="주소를 입력해주세요"
            />
          </div>
          {errorMessage && errorMessage.field === "address" && (
            <p className="fieldError">{errorMessage.message}</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
